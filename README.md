# ⚡ Electricity Consumption Calculator

A modern, responsive PHP application for calculating power consumption, energy usage, and electricity costs.

## ✨ Features

- **Power Calculation** — Compute wattage from voltage and current inputs
- **Energy Consumption** — Calculate kilowatt-hours (kWh) for any time period
- **Cost Estimation** — Estimate electricity charges based on your rate
- **Multiple Time Periods** — View results for hourly, daily, and custom durations
- **Modern UI** — Clean, responsive design with smooth animations
- **Real-time Validation** — Instant input feedback with visual indicators
- **No Dependencies** — Pure CSS and vanilla JavaScript (no Bootstrap or jQuery)

## 📁 Project Structure

```
electricity-calculator/
├── index.php                 # Main application entry point
├── composer.json             # Composer dependencies & autoloading
├── README.md                 # Project documentation
├── assets/
│   ├── css/
│   │   └── style.css        # Main stylesheet (modern, responsive)
│   └── js/
│       └── main.js          # Interactive functionality
├── src/                      # PSR-4 autoloaded classes
│   ├── Calculator.php       # Core calculation logic
│   └── Validator.php        # Input validation & processing
└── vendor/                   # Composer dependencies (auto-generated)
```

## 🧮 Formulas Used

| Calculation   | Formula                           |
|---------------|-----------------------------------|
| Power (W)     | Voltage (V) × Current (A)         |
| Energy (kWh)  | Power × Hours ÷ 1000              |
| Total Charge  | Energy (kWh) × (Rate ÷ 100)       |

## 📋 Requirements

- PHP 7.4 or higher
- Composer (for dependency management)
- Web server (Apache, Nginx, XAMPP, or PHP built-in server)

## 🚀 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/electricity-calculator.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd electricity-calculator
   ```

3. **Install dependencies:**
   ```bash
   composer install
   ```
   
   Or if Composer isn't installed globally:
   ```bash
   php composer.phar install
   ```

4. **Start a local PHP server:**
   ```bash
   php -S localhost:8000
   ```
   
   Or if using XAMPP:
   ```bash
   # Add PHP to PATH or use full path
   C:\xampp\php\php.exe -S localhost:8000
   ```

4. **Open your browser:**
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
