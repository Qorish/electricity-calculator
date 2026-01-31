<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Electricity Consumption Calculator</title>
    <!-- Bootstrap 4 CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
    <style>
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 40px 0;
        }
        .calculator-card {
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        .card-header {
            border-radius: 15px 15px 0 0 !important;
            background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
        }
        .result-box {
            background-color: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            margin-top: 20px;
        }
        .result-item {
            padding: 10px;
            margin: 5px 0;
            border-left: 4px solid #3498db;
            background-color: #fff;
        }
        .btn-calculate {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            padding: 12px 40px;
        }
        .btn-calculate:hover {
            background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
        }
    </style>
</head>
<body>

<?php
/**
 * Electricity Consumption Calculator
 * 
 * Calculates power, energy, and total charge based on:
 * - Power (Wh) = Voltage (V) * Current (A)
 * - Energy (kWh) = Power * Hours / 1000
 * - Total = Energy (kWh) * (rate/100)
 */

/**
 * Calculate electricity consumption
 * 
 * @param float $voltage - Voltage in Volts (V)
 * @param float $current - Current in Amperes (A)
 * @param float $rate - Current rate per kWh
 * @param int $hours - Number of hours (default: 1 for hourly, 24 for daily)
 * @return array - Array containing power, energy, and total charge
 */
function calculateElectricity($voltage, $current, $rate, $hours = 1) {
    // Calculate Power in Watts (W) = Voltage * Current
    $power = $voltage * $current;
    
    // Calculate Energy in kWh = Power * Hours / 1000
    $energy = ($power * $hours) / 1000;
    
    // Calculate Total Charge = Energy * (rate/100)
    $totalCharge = $energy * ($rate / 100);
    
    return [
        'power' => $power,
        'energy' => $energy,
        'totalCharge' => $totalCharge
    ];
}

/**
 * Calculate electricity rates per hour
 * 
 * @param float $voltage - Voltage in Volts (V)
 * @param float $current - Current in Amperes (A)
 * @param float $rate - Current rate per kWh
 * @return array - Hourly calculation results
 */
function calculatePerHour($voltage, $current, $rate) {
    return calculateElectricity($voltage, $current, $rate, 1);
}

/**
 * Calculate electricity rates per day (24 hours)
 * 
 * @param float $voltage - Voltage in Volts (V)
 * @param float $current - Current in Amperes (A)
 * @param float $rate - Current rate per kWh
 * @return array - Daily calculation results
 */
function calculatePerDay($voltage, $current, $rate) {
    return calculateElectricity($voltage, $current, $rate, 24);
}

// Initialize variables
$voltage = $current = $rate = $customHours = '';
$results = null;
$errors = [];

// Process form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validate and sanitize inputs
    $voltage = filter_input(INPUT_POST, 'voltage', FILTER_VALIDATE_FLOAT);
    $current = filter_input(INPUT_POST, 'current', FILTER_VALIDATE_FLOAT);
    $rate = filter_input(INPUT_POST, 'rate', FILTER_VALIDATE_FLOAT);
    $customHours = filter_input(INPUT_POST, 'hours', FILTER_VALIDATE_INT);
    
    // Validation
    if ($voltage === false || $voltage === null || $voltage <= 0) {
        $errors[] = 'Please enter a valid positive voltage value.';
    }
    if ($current === false || $current === null || $current <= 0) {
        $errors[] = 'Please enter a valid positive current value.';
    }
    if ($rate === false || $rate === null || $rate < 0) {
        $errors[] = 'Please enter a valid rate value.';
    }
    if ($customHours === false || $customHours === null || $customHours <= 0) {
        $customHours = 1; // Default to 1 hour
    }
    
    // Calculate if no errors
    if (empty($errors)) {
        $results = [
            'hourly' => calculatePerHour($voltage, $current, $rate),
            'daily' => calculatePerDay($voltage, $current, $rate),
            'custom' => calculateElectricity($voltage, $current, $rate, $customHours),
            'customHours' => $customHours
        ];
    }
}
?>

<div class="container">
    <div class="row justify-content-center">
        <div class="col-lg-8">
            <div class="card calculator-card">
                <div class="card-header text-white text-center py-4">
                    <h2 class="mb-0">
                        <i class="fas fa-bolt"></i> Electricity Consumption Calculator
                    </h2>
                    <p class="mb-0 mt-2">Calculate Power, Energy & Total Charge</p>
                </div>
                
                <div class="card-body p-4">
                    <?php if (!empty($errors)): ?>
                        <div class="alert alert-danger">
                            <strong>Error!</strong>
                            <ul class="mb-0">
                                <?php foreach ($errors as $error): ?>
                                    <li><?php echo htmlspecialchars($error); ?></li>
                                <?php endforeach; ?>
                            </ul>
                        </div>
                    <?php endif; ?>
                    
                    <form method="POST" action="">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="voltage">
                                        <strong>Voltage (V)</strong>
                                    </label>
                                    <input type="number" 
                                           class="form-control form-control-lg" 
                                           id="voltage" 
                                           name="voltage" 
                                           placeholder="e.g., 220"
                                           step="0.01"
                                           value="<?php echo htmlspecialchars($_POST['voltage'] ?? ''); ?>"
                                           required>
                                    <small class="form-text text-muted">Enter voltage in Volts</small>
                                </div>
                            </div>
                            
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="current">
                                        <strong>Current (A)</strong>
                                    </label>
                                    <input type="number" 
                                           class="form-control form-control-lg" 
                                           id="current" 
                                           name="current" 
                                           placeholder="e.g., 5"
                                           step="0.01"
                                           value="<?php echo htmlspecialchars($_POST['current'] ?? ''); ?>"
                                           required>
                                    <small class="form-text text-muted">Enter current in Amperes</small>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="rate">
                                        <strong>Rate per kWh</strong>
                                    </label>
                                    <input type="number" 
                                           class="form-control form-control-lg" 
                                           id="rate" 
                                           name="rate" 
                                           placeholder="e.g., 12"
                                           step="0.01"
                                           value="<?php echo htmlspecialchars($_POST['rate'] ?? ''); ?>"
                                           required>
                                    <small class="form-text text-muted">Enter electricity rate</small>
                                </div>
                            </div>
                            
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="hours">
                                        <strong>Custom Hours</strong>
                                    </label>
                                    <input type="number" 
                                           class="form-control form-control-lg" 
                                           id="hours" 
                                           name="hours" 
                                           placeholder="e.g., 8"
                                           min="1"
                                           value="<?php echo htmlspecialchars($_POST['hours'] ?? '1'); ?>">
                                    <small class="form-text text-muted">Hours for custom calculation</small>
                                </div>
                            </div>
                        </div>
                        
                        <div class="text-center mt-4">
                            <button type="submit" class="btn btn-primary btn-calculate btn-lg">
                                Calculate
                            </button>
                            <button type="reset" class="btn btn-secondary btn-lg ml-2">
                                Reset
                            </button>
                        </div>
                    </form>
                    
                    <?php if ($results): ?>
                        <div class="result-box">
                            <h4 class="text-center mb-4">
                                <span class="badge badge-success">Calculation Results</span>
                            </h4>
                            
                            <!-- Power Result -->
                            <div class="result-item">
                                <h5>⚡ Power</h5>
                                <p class="mb-0">
                                    <strong><?php echo number_format($results['hourly']['power'], 2); ?> Watts (W)</strong>
                                    <br>
                                    <small class="text-muted">
                                        Formula: Power = Voltage × Current = 
                                        <?php echo $voltage; ?>V × <?php echo $current; ?>A
                                    </small>
                                </p>
                            </div>
                            
                            <!-- Hourly Results -->
                            <div class="result-item">
                                <h5>🕐 Per Hour (1 Hour)</h5>
                                <p class="mb-0">
                                    Energy: <strong><?php echo number_format($results['hourly']['energy'], 4); ?> kWh</strong>
                                    <br>
                                    Total Charge: <strong><?php echo number_format($results['hourly']['totalCharge'], 2); ?></strong>
                                </p>
                            </div>
                            
                            <!-- Daily Results -->
                            <div class="result-item">
                                <h5>📅 Per Day (24 Hours)</h5>
                                <p class="mb-0">
                                    Energy: <strong><?php echo number_format($results['daily']['energy'], 4); ?> kWh</strong>
                                    <br>
                                    Total Charge: <strong><?php echo number_format($results['daily']['totalCharge'], 2); ?></strong>
                                </p>
                            </div>
                            
                            <!-- Custom Hours Results -->
                            <div class="result-item">
                                <h5>⏱️ Custom (<?php echo $results['customHours']; ?> Hours)</h5>
                                <p class="mb-0">
                                    Energy: <strong><?php echo number_format($results['custom']['energy'], 4); ?> kWh</strong>
                                    <br>
                                    Total Charge: <strong><?php echo number_format($results['custom']['totalCharge'], 2); ?></strong>
                                </p>
                            </div>
                            
                            <!-- Formulas Used -->
                            <div class="alert alert-info mt-4">
                                <h6><strong>Formulas Used:</strong></h6>
                                <ul class="mb-0">
                                    <li>Power (W) = Voltage (V) × Current (A)</li>
                                    <li>Energy (kWh) = Power × Hours ÷ 1000</li>
                                    <li>Total Charge = Energy (kWh) × (Rate ÷ 100)</li>
                                </ul>
                            </div>
                        </div>
                    <?php endif; ?>
                </div>
                
                <div class="card-footer text-center text-muted">
                    <small>Electricity Consumption Calculator &copy; <?php echo date('Y'); ?></small>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Bootstrap 4 JS and dependencies -->
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.min.js"></script>

</body>
</html>
