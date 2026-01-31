<?php

namespace ElectricityCalculator;

/**
 * Form Validator
 * Handles form input validation and sanitization
 * @author Qorish
 * @version 1.0.0
 */
class Validator
{
    /**
     * Validate and sanitize form input
     * @param string $field    - Field name from POST
     * @param string $type     - Type of validation (float, int)
     * @param bool   $positive - Whether value must be positive
     * @return mixed           - Validated value or false on failure
     */
    public static function validateInput(string $field, string $type = 'float', bool $positive = true)
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
     * Process form submission and return results
     * @return array - Contains 'errors' array and 'results' array
     */
    public static function processCalculation(): array
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
        $voltage = self::validateInput('voltage', 'float', true);
        $current = self::validateInput('current', 'float', true);
        $rate = self::validateInput('rate', 'float', false);
        $customHours = self::validateInput('hours', 'int', true);
        
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
                'hourly'      => Calculator::calculatePerHour($voltage, $current, $rate),
                'daily'       => Calculator::calculatePerDay($voltage, $current, $rate),
                'custom'      => Calculator::calculate($voltage, $current, $rate, $customHours),
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
}
