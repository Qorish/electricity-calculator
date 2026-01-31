<?php

namespace ElectricityCalculator;

/**
 * Electricity Calculator - Core Functions
 * Contains all calculation logic for the electricity consumption calculator.
 * @author Qorish
 * @version 1.0.0
 */
class Calculator
{
    /**
     * Calculate electricity consumption
     * @param float $voltage - Voltage in Volts (V)
     * @param float $current - Current in Amperes (A)
     * @param float $rate    - Rate per kWh (currency units)
     * @param int   $hours   - Duration in hours
     * @return array         - Calculation results
     */
    public static function calculate(float $voltage, float $current, float $rate, int $hours = 1): array
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
    public static function calculatePerHour(float $voltage, float $current, float $rate): array
    {
        return self::calculate($voltage, $current, $rate, 1);
    }

    /**
     * Calculate daily electricity consumption (24 hours)
     * @param float $voltage - Voltage in Volts (V)
     * @param float $current - Current in Amperes (A)
     * @param float $rate    - Rate per kWh
     * @return array         - Daily calculation results
     */
    public static function calculatePerDay(float $voltage, float $current, float $rate): array
    {
        return self::calculate($voltage, $current, $rate, 24);
    }

    /**
     * Format number for display
     * @param float $number   - Number to format
     * @param int   $decimals - Decimal places
     * @return string         - Formatted number
     */
    public static function formatNumber(float $number, int $decimals = 2): string
    {
        return number_format($number, $decimals);
    }
}
