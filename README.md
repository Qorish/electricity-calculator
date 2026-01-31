# Electricity Consumption Calculator

A simple PHP application to calculate power, energy, and total electricity charge based on user inputs.

## Features

- Calculate **Power** in Watts (W)
- Calculate **Energy** in kilowatt-hours (kWh)
- Calculate **Total Charge** based on the current rate
- Results displayed for:
  - Per Hour (1 hour)
  - Per Day (24 hours)
  - Custom hours (user-defined)
- Responsive design using **Bootstrap 4**
- Input validation and error handling

## Formulas Used

| Calculation | Formula |
|-------------|---------|
| Power (W) | Voltage (V) × Current (A) |
| Energy (kWh) | Power × Hours ÷ 1000 |
| Total Charge | Energy (kWh) × (Rate ÷ 100) |

## Requirements

- PHP 7.0 or higher
- Web server (Apache, Nginx, or PHP built-in server)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/electricity-calculator.git
   ```

2. Navigate to the project directory:
   ```bash
   cd electricity-calculator
   ```

3. Start a local PHP server:
   ```bash
   php -S localhost:8000
   ```

4. Open your browser and go to:
   ```
   http://localhost:8000
   ```

## Usage

1. Enter the **Voltage** (in Volts)
2. Enter the **Current** (in Amperes)
3. Enter the **Rate** per kWh
4. Optionally, enter **Custom Hours** for custom calculation
5. Click **Calculate** to see the results

## Example

**Input:**
- Voltage: 220 V
- Current: 5 A
- Rate: 12 per kWh
- Custom Hours: 8

**Output:**
- Power: 1100 W
- Energy (per hour): 1.1 kWh
- Energy (per day): 26.4 kWh
- Total Charge (per hour): 0.132
- Total Charge (per day): 3.168

## File Structure

```
electricity-calculator/
├── index.php      # Main application file
├── README.md      # Documentation
└── .gitignore     # Git ignore file
```

## Technologies Used

- **PHP** (Vanilla/Plain PHP)
- **Bootstrap 4** (CSS Framework)
- **HTML5**
- **CSS3**

## Functions

### `calculateElectricity($voltage, $current, $rate, $hours)`
Main function to calculate electricity consumption.

**Parameters:**
- `$voltage` (float) - Voltage in Volts
- `$current` (float) - Current in Amperes
- `$rate` (float) - Rate per kWh
- `$hours` (int) - Number of hours

**Returns:** Array with power, energy, and totalCharge

### `calculatePerHour($voltage, $current, $rate)`
Calculate electricity rates per hour (1 hour).

### `calculatePerDay($voltage, $current, $rate)`
Calculate electricity rates per day (24 hours).

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

Created for educational purposes.
