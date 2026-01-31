<?php
/**
 * Electricity Consumption Calculator

 * A modern, clean calculator for computing power, energy, and electricity costs.
 * @author Qorish
 * @version 1.0.0
 */

// Composer autoload
require_once __DIR__ . '/vendor/autoload.php';

use ElectricityCalculator\Validator;
use ElectricityCalculator\Calculator;

// Process form submission
$data = Validator::processCalculation();
$errors = $data['errors'];
$results = $data['results'];
$inputValues = $data['inputValues'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Calculate your electricity consumption, power usage, and costs with this easy-to-use calculator.">
    <title>Electricity Consumption Calculator</title>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Main Stylesheet -->
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <main class="calculator-wrapper">
        <article class="calculator-card">
            <!-- Header Section -->
            <header class="card-header">
                <div class="header-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <h1>Electricity Calculator</h1>
                <p class="subtitle">Calculate Power, Energy & Total Charge</p>
            </header>

            <!-- Main Content -->
            <div class="card-body">
                <?php if (!empty($errors)): ?>
                    <div class="alert alert-danger" role="alert">
                        <strong>Please fix the following errors:</strong>
                        <ul>
                            <?php foreach ($errors as $error): ?>
                                <li><?= htmlspecialchars($error) ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                <?php endif; ?>

                <!-- Calculator Form -->
                <form method="POST" action="" class="calculator-form" novalidate>
                    <div class="input-grid">
                        <!-- Voltage Input -->
                        <div class="form-group">
                            <label for="voltage" class="form-label">Voltage (V)</label>
                            <input
                                type="number"
                                id="voltage"
                                name="voltage"
                                class="form-control"
                                placeholder="e.g., 220"
                                step="0.01"
                                min="0"
                                value="<?= htmlspecialchars($inputValues['voltage']) ?>"
                                required
                            >
                            <span class="form-hint">Enter voltage in Volts</span>
                        </div>

                        <!-- Current Input -->
                        <div class="form-group">
                            <label for="current" class="form-label">Current (A)</label>
                            <input
                                type="number"
                                id="current"
                                name="current"
                                class="form-control"
                                placeholder="e.g., 5"
                                step="0.01"
                                min="0"
                                value="<?= htmlspecialchars($inputValues['current']) ?>"
                                required
                            >
                            <span class="form-hint">Enter current in Amperes</span>
                        </div>

                        <!-- Rate Input -->
                        <div class="form-group">
                            <label for="rate" class="form-label">Rate (sen/kWh)</label>
                            <input
                                type="number"
                                id="rate"
                                name="rate"
                                class="form-control"
                                placeholder="e.g., 120"
                                step="0.01"
                                min="0"
                                value="<?= htmlspecialchars($inputValues['rate']) ?>"
                                required
                            >
                            <span class="form-hint">Enter your electricity rate in sen per kWh</span>
                        </div>

                        <!-- Hours Input -->
                        <div class="form-group">
                            <label for="hours" class="form-label">Custom Hours</label>
                            <input
                                type="number"
                                id="hours"
                                name="hours"
                                class="form-control"
                                placeholder="e.g., 8"
                                min="1"
                                value="<?= htmlspecialchars($inputValues['hours'] ?: '1') ?>"
                            >
                            <span class="form-hint">Duration for custom calculation</span>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="btn-group">
                        <button type="submit" class="btn btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            <span class="btn-text">Calculate</span>
                        </button>
                        <button type="button" class="btn btn-secondary btn-reset">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Reset
                        </button>
                    </div>
                </form>

                <?php if ($results): ?>
                    <!-- Results Section -->
                    <section class="results-section">
                        <div class="results-header">
                            <span class="results-badge">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Calculation Results
                            </span>
                            <?php if (isset($results['inputs']['rate']) && is_numeric($results['inputs']['rate'])): ?>
                                <div style="margin-top:8px;font-size:0.95rem;color:var(--gray-600);">
                                    RM Rate: <strong><?= number_format($results['inputs']['rate']/100, 2) ?> RM/kWh</strong>
                                </div>
                            <?php endif; ?>
                            <?php if (isset($results['hourly']['power'])): ?>
                                <div style="margin-top:4px;font-size:0.95rem;color:var(--gray-600);">
                                    Power: <strong><?= number_format($results['hourly']['power'], 2) ?> W (<?= number_format($results['hourly']['power']/1000, 2) ?> kW)</strong>
                                </div>
                            <?php endif; ?>
                        </div>

                        <div class="results-grid">
                            <!-- Power Result -->
                            <div class="result-card">
                                <h3 class="result-title">
                                    <span class="result-icon" style="display:inline-flex;align-items:center;justify-content:center;width:2.5em;height:2.5em;border-radius:50%;border:2px solid #e2e8f0;background:#fff;box-shadow:0 2px 8px rgba(99,102,241,0.08);margin-right:8px;overflow:hidden;">
                                        <img src="assets/icon/electric-power.gif" alt="Power" style="width:100%;height:100%;object-fit:contain;" />
                                    </span>
                                    Power
                                </h3>
                                <div class="result-value"><?= Calculator::formatNumber($results['hourly']['power'], 2) ?> W</div>
                                <p class="result-detail">Watts of power consumption</p>
                                <p class="result-formula">
                                    <?= $results['inputs']['voltage'] ?>V × <?= $results['inputs']['current'] ?>A = <?= Calculator::formatNumber($results['hourly']['power'], 2) ?>W
                                </p>
                            </div>

                            <!-- Hourly Result -->
                            <div class="result-card">
                                <h3 class="result-title">
                                    <span class="result-icon" style="display:inline-flex;align-items:center;justify-content:center;width:2.5em;height:2.5em;border-radius:50%;border:2px solid #e2e8f0;background:#fff;box-shadow:0 2px 8px rgba(99,102,241,0.08);margin-right:8px;overflow:hidden;">
                                        <img src="assets/icon/1-hour.gif" alt="Per Hour" style="width:100%;height:100%;object-fit:contain;" />
                                    </span>
                                    Per Hour
                                </h3>
                                <div class="result-value"><?= Calculator::formatNumber($results['hourly']['energy'], 4) ?> kWh</div>
                                <p class="result-detail">
                                    Total Charge: <strong><?= Calculator::formatNumber($results['hourly']['totalCharge'], 2) ?></strong>
                                </p>
                            </div>

                            <!-- Daily Result -->
                            <div class="result-card">
                                <h3 class="result-title">
                                    <span class="result-icon" style="display:inline-flex;align-items:center;justify-content:center;width:2.5em;height:2.5em;border-radius:50%;border:2px solid #e2e8f0;background:#fff;box-shadow:0 2px 8px rgba(99,102,241,0.08);margin-right:8px;overflow:hidden;">
                                        <img src="assets/icon/24-hour-service.gif" alt="Per Day (24h)" style="width:100%;height:100%;object-fit:contain;" />
                                    </span>
                                    Per Day (24h)
                                </h3>
                                <div class="result-value"><?= Calculator::formatNumber($results['daily']['energy'], 4) ?> kWh</div>
                                <p class="result-detail">
                                    Total Charge: <strong><?= Calculator::formatNumber($results['daily']['totalCharge'], 2) ?></strong>
                                </p>
                            </div>

                            <!-- Custom Hours Result -->
                            <div class="result-card">
                                <h3 class="result-title">
                                    <span class="result-icon" style="display:inline-flex;align-items:center;justify-content:center;width:2.5em;height:2.5em;border-radius:50%;border:2px solid #e2e8f0;background:#fff;box-shadow:0 2px 8px rgba(99,102,241,0.08);margin-right:8px;overflow:hidden;">
                                        <img src="assets/icon/time.gif" alt="Custom Hours" style="width:100%;height:100%;object-fit:contain;" />
                                    </span>
                                    Custom (<?= $results['customHours'] ?>h)
                                </h3>
                                <div class="result-value"><?= Calculator::formatNumber($results['custom']['energy'], 4) ?> kWh</div>
                                <p class="result-detail">
                                    Total Charge: <strong><?= Calculator::formatNumber($results['custom']['totalCharge'], 2) ?></strong>
                                </p>
                            </div>
                        </div>

                        <!-- Formula Reference -->
                        <div class="formula-box">
                            <h3>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Formulas Used
                            </h3>
                            <ul class="formula-list">
                                <li>Power (W) = Voltage (V) × Current (A)</li>
                                <li>Energy (kWh) = Power × Hours ÷ 1000</li>
                                <li>Total Charge = Energy (kWh) × (Rate ÷ 100)</li>
                            </ul>
                        </div>
                        <div style="text-align:center;margin-top:32px;">
                            <button id="show-breakdown" class="btn btn-breakdown" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Show 24-Hour Breakdown</span>
                            </button>
                        </div>
                        <div id="breakdown-table-container" style="display:none;margin-top:24px;"></div>
                    </section>
                <?php endif; ?>
            </div>

            <!-- Footer -->
            <footer class="card-footer">
                <p class="footer-text">
                    Electricity Consumption Calculator &copy; <?= date('Y') ?>
                </p>
            </footer>
        </article>
    </main>

    <!-- JavaScript -->
    <script src="assets/js/main.js"></script>
    <script>
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('show-breakdown');
    if (btn) {
        btn.addEventListener('click', function() {
            const container = document.getElementById('breakdown-table-container');
            if (!container) return;
            if (container.innerHTML.trim() === '') {
                <?php
                // PHP: Generate 24-hour breakdown data as a JS array
                $hourlyRows = [];
                $valid = isset($results['hourly']['power'], $results['inputs']['rate']) && is_numeric($results['hourly']['power']) && is_numeric($results['inputs']['rate']);
                for ($h = 1; $h <= 24; $h++) {
                    if ($valid) {
                        $energy = $results['hourly']['power'] * $h / 1000;
                        $charge = $energy * ($results['inputs']['rate'] / 100);
                        $hourlyRows[] = [
                            'hour' => $h,
                            'energy' => number_format($energy, 4),
                            'charge' => number_format($charge, 2)
                        ];
                    } else {
                        $hourlyRows[] = [
                            'hour' => $h,
                            'energy' => 'Invalid parameter',
                            'charge' => 'Invalid parameter'
                        ];
                    }
                }
                ?>
                const breakdownData = <?php echo json_encode($hourlyRows); ?>;
                let html = '<table class="breakdown-table">';
                html += '<thead><tr><th>Hour</th><th>Energy (kWh)</th><th>Charge (RM)</th></tr></thead><tbody>';
                breakdownData.forEach(row => {
                    html += `<tr><td>${row.hour}h</td><td>${row.energy}</td><td>RM ${row.charge}</td></tr>`;
                });
                html += '</tbody></table>';
                container.innerHTML = html;
            }
            container.style.display = container.style.display === 'none' ? 'block' : 'none';
            const spanText = btn.querySelector('span');
            if (spanText) {
                spanText.textContent = container.style.display === 'none' ? 'Show 24-Hour Breakdown' : 'Hide 24-Hour Breakdown';
            }
        });
    }
});
    </script>
</body>
</html>
