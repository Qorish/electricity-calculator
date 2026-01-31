<?php
/**
 * Electricity Calculator - Core Functions
 *
 * Contains all calculation logic for the electricity consumption calculator.
 *
 * @author Qorish
 * @version 1.0.0
 */

/**
 * Calculate electricity consumption
 * @param float $voltage - Voltage in Volts (V)
 * @param float $current - Current in Amperes (A)
 * @param float $rate    - Rate per kWh (currency units)
 * @param int   $hours   - Duration in hours
 * @return array         - Calculation results
 */
function calculateElectricity(float $voltage, float $current, float $rate, int $hours = 1): array
{
    // Power (W) = Voltage × Current
    $power = $voltage * $current;
    
    // Energy (kWh) = Power × Hours / 1000
    $energy = ($power * $hours) / 1000;
    
    // Total Charge = Energy × (Rate / 100)
    $totalCharge = $energy * ($rate / 100);
    
    return [
        'power'       => $power,
        'energy'      => $energy,
        'totalCharge' => $totalCharge
    ];
}

/**
 * Calculate hourly electricity consumption
 * @param float $voltage - Voltage in Volts (V)
 * @param float $current - Current in Amperes (A)
 * @param float $rate    - Rate per kWh
 * @return array         - Hourly calculation results
 */
function calculatePerHour(float $voltage, float $current, float $rate): array
{
    return calculateElectricity($voltage, $current, $rate, 1);
}

/**
 * Calculate daily electricity consumption (24 hours)
 * @param float $voltage - Voltage in Volts (V)
 * @param float $current - Current in Amperes (A)
 * @param float $rate    - Rate per kWh
 * @return array         - Daily calculation results
 */
function calculatePerDay(float $voltage, float $current, float $rate): array
{
    return calculateElectricity($voltage, $current, $rate, 24);
}

/**
 * Validate and sanitize form input
 * @param string $field   - Field name from POST
 * @param string $type    - Type of validation (float, int)
 * @param bool   $positive - Whether value must be positive
 * @return mixed          - Validated value or false on failure
 */
function validateInput(string $field, string $type = 'float', bool $positive = true)
{
    $filter = $type === 'int' ? FILTER_VALIDATE_INT : FILTER_VALIDATE_FLOAT;
    $value = filter_input(INPUT_POST, $field, $filter);
    
    if ($value === false || $value === null) {
        return false;
    }
    
    if ($positive && $value <= 0) {
        return false;
    }
    
    return $value;
}

/**
 * Format number for display
 * @param float $number   - Number to format
 * @param int   $decimals - Decimal places
 * @return string         - Formatted number
 */
function formatNumber(float $number, int $decimals = 2): string
{
    return number_format($number, $decimals);
}

/**
 * Process form submission and return results
 * @return array - Contains 'errors' array and 'results' array
 */
function processCalculation(): array
{
    $errors = [];
    $results = null;
    $inputValues = [
        'voltage' => '',
        'current' => '',
        'rate'    => '',
        'hours'   => '1'
    ];
    
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        return compact('errors', 'results', 'inputValues');
    }
    
    // Store input values for form repopulation
    $inputValues = [
        'voltage' => $_POST['voltage'] ?? '',
        'current' => $_POST['current'] ?? '',
        'rate'    => $_POST['rate'] ?? '',
        'hours'   => $_POST['hours'] ?? '1'
    ];
    
    // Validate inputs
    $voltage = validateInput('voltage', 'float', true);
    $current = validateInput('current', 'float', true);
    $rate = validateInput('rate', 'float', false);
    $customHours = validateInput('hours', 'int', true);
    
    // Collect validation errors
    if ($voltage === false) {
        $errors[] = 'Please enter a valid positive voltage value.';
    }
    if ($current === false) {
        $errors[] = 'Please enter a valid positive current value.';
    }
    if ($rate === false) {
        $errors[] = 'Please enter a valid rate value.';
    }
    if ($customHours === false) {
        $customHours = 1;
    }
    
    // Calculate if no errors
    if (empty($errors)) {
        $results = [
            'hourly'      => calculatePerHour($voltage, $current, $rate),
            'daily'       => calculatePerDay($voltage, $current, $rate),
            'custom'      => calculateElectricity($voltage, $current, $rate, $customHours),
            'customHours' => $customHours,
            'inputs'      => [
                'voltage' => $voltage,
                'current' => $current,
                'rate'    => $rate
            ]
        ];
    }
    
    return compact('errors', 'results', 'inputValues');
}
