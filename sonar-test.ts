/**
 * SONARQUBE TRACKING VERIFICATION TEST
 * This file guarantees 2 Bugs and 1 Vulnerability on your dashboard.
 */

// ==========================================
// VULNERABILITY 1: Hardcoded Private Credentials (Sonar Rule: S2068)
// ==========================================
export const githubTokenCredentials = "ghp_1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcd";


// ==========================================
// BUG 1: Self-Assignment Logic Loop (Sonar Rule: S1656)
// ==========================================
export function evaluateUserStatus(statusString: string): string {
  let activeStatus = statusString;
  
  // This self-assignment serves no purpose and forces a Major Bug flag.
  activeStatus = activeStatus; 
  
  return activeStatus;
}

const debugMode = true;
if (debugMode === debugMode) {
  console.log("This identical comparison guarantees a SonarQube bug rule trigger.");
}


// ==========================================
// BUG 2: Identical Conditional Code Branches (Sonar Rule: S3923)
// ==========================================
export function processSystemAccess(isManager: boolean): string {
  if (isManager) {
    // Standard system access logic string
    return "ACCESS_GRANTED_SECURE_ENVIRONMENT";
  } else {
    // Both paths return the identical code string, triggering a Critical Bug flag.
    return "ACCESS_GRANTED_SECURE_ENVIRONMENT";
  }
}

# Step 1: Pre-stage and snapshot uncommitted code adjustments 
- name: Commit Local Code Updates for Scanner Eligibility
  run: |
    git config --global user.name "Sonar Automation Runner"
    git config --global user.email "runner@internal.local"
    git add src/main.tsx sonar-project.properties
    git commit -m "automation: commit local updates to clear scanner eligibility gates" || echo "No changes to commit"
  shell: bash

# Step 2: Execute SonarQube Scan
- name: Run SonarQube Scan
  continue-on-error: true
  uses: SonarSource/sonarqube-scan-action@v5
  env:
    SONAR_TOKEN: ${{ secrets.AP_PLATFORM_FRONTEND }}
    SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}
  with:
    args: >
      -Dsonar.qualitygate.wait=false

az webapp log download --name wa-agentic-acp-ocr-dev --resource-group rg-agentic-acp-dev --to-dir ./logs && cat ./logs/LogFiles/StartupLogs/.sources/*containerStream.log


az webapp config show --name wa-agentic-acp-ocr-dev --resource-group rg-agentic-acp-dev --query "startupFile" --output tsv

az webapp config set --name wa-agentic-acp-ocr-dev --resource-group rg-agentic-acp-dev --startup-file "uvicorn main:app --host 0.0.0.0 --port 8080"

az webapp config set --name wa-agentic-acp-ocr-dev --resource-group rg-agentic-acp-dev --startup-file "gunicorn --bind=0.0.0.0:8080 app:app"
az webapp config set --name wa-agentic-acp-ocr-dev --resource-group rg-agentic-acp-dev --startup-file "gunicorn --bind=0.0.0.0:8000 app:app"

az webapp config appsettings set --name wa-agentic-acp-ocr-dev --resource-group rg-agentic-acp-dev --settings WEBSITES_PORT=8080


az webapp config container set --name wa-agentic-acp-ocr-dev --resource-group rg-agentic-acp-dev --docker-custom-image-name "acragenticacpdev.azurecr.io/agentic-acp-ocr:latest"
az webapp stop --name wa-agentic-acp-ocr-dev --resource-group rg-agentic-acp-dev
az webapp start --name wa-agentic-acp-ocr-dev --resource-group rg-agentic-acp-dev

**************************
def process_system_loop(items):
    # This loop logic is broken and will never terminate if executed.
    # SonarQube flags infinite or meaningless conditions as severe bugs.
    counter = 0
    while counter < 10:
        if counter == 5:
            # 🐛 BUG: Modifying execution variable incorrectly
            pass 
        # Missing increment inside specific logic blocks creates a bug trap

***************************

def check_processing_status(status_code):
    if status_code == 400:
        return "Bad Request"
    elif status_code == 500:
        return "Server Error"
    elif status_code == 400:  # 🪲 BUG: Identical condition to the first 'if'
        return "Duplicate Check"

***************************

def execute_system_alert():
    # 🪲 CRITICAL BUG: Missing formatting argument causes immediate runtime crash
    alert_message = "Error code: {} occurred at system layer: {}".format("ERR_404")
    return alert_message


**************
  - name: Generate External Linter Issues
    shell: powershell
    run: |
      Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process -Force
      $ErrorActionPreference = "Continue"

      # 1. Target the EXACT deep path SonarQube is looking for
      $targetDir = "C:\actions-runner-win-x64-2.335.1\_work\Agentic-AP-POC\Agentic-AP-POC"
      $reportPath = Join-Path $targetDir "flake8-report.txt"

      Write-Host "Creating report placeholder at: $reportPath"
      
      # 2. Force-create the folder and an empty file so SonarQube ALWAYS finds it
      if (!(Test-Path $targetDir)) { New-Item -ItemType Directory -Path $targetDir -Force }
      New-Item -ItemType File -Path $reportPath -Force | Out-Null

      # 3. Install and execute Flake8 directly into that absolute path
      python -m pip install --upgrade pip
      python -m pip install flake8
      python -m flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics --output-file="$reportPath"

      # 4. Print verification to your logs
      Write-Host "Final file confirmation check:"
      Get-Item $reportPath
*********


  - name: Generate HTML Quality Report
    shell: powershell
    env:
      SONAR_HOST: ${{ secrets.SONAR_HOST_URL }}
      PROJECT_KEY: "SamplePython"
      SONAR_TOKEN: ${{ secrets['Sample.Python'] }}  # Securely maps token to prevent syntax escaping errors
    run: |
      # 1. Wait buffer to let the SonarQube background processing engine finish saving metrics
      Write-Host "Waiting 12 seconds for server database sync..."
      Start-Sleep -Seconds 12

      $SONAR_HOST = $env:SONAR_HOST
      $PROJECT_KEY = $env:PROJECT_KEY
      $TOKEN = $env:SONAR_TOKEN

      # 2. Build Authorization headers securely
      $headers = @{ Authorization = "Basic " + [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("$($TOKEN):")) }
      
      # 3. Clean Web API Request (Removed branch criteria as it is unsupported in Community Version)
      $apiUrl = "$($SONAR_HOST)/api/issues/search?componentKeys=$($PROJECT_KEY)&resolved=false&ps=500"
      Write-Host "Fetching report payload from: $apiUrl"
      $response = Invoke-RestMethod -Uri $apiUrl -Headers $headers -Method Get

      # 4. Filter issues by type using LOWERCASE matching to align exactly with SonarQube's API JSON response keys
      $bugsList = $response.issues | Where-Object { $_.type -eq "bug" }
      $vulnList = $response.issues | Where-Object { $_.type -eq "vulnerability" }
      $smellList = $response.issues | Where-Object { $_.type -eq "code_smell" }

      # 5. Helper function to generate clean table rows for details
      function Get-IssueRows($issues) {
          if ($null -eq $issues -or $issues.Count -eq 0) { 
              return "<tr><td colspan='3' style='text-align:center; color:#888;'>No issues found 🎉</td></tr>" 
          }
          $rows = ""
          foreach ($i in $issues) {
              # Strip out project token prefix from path
              $file = $i.component -replace "^[^:]+:", ""
              $lineNum = if ($i.line) { $i.line } else { "Global" }
              $rows += "<tr><td>$file</td><td>Line $lineNum</td><td>$($i.message)</td></tr>"
          }
          return $rows
      }

      # 6. Execute function calls wrapping variables inside proper PowerShell parentheses
      $bugRows   = Get-IssueRows($bugsList)
      $vulnRows  = Get-IssueRows($vulnList)
      $smellRows = Get-IssueRows($smellList)

      $date = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss UTC")

      # 7. Compile the HTML Document Template
      $htmlContent = @"
      <!DOCTYPE html>
      <html>
      <head>
          <title>SonarQube Detailed Report - $PROJECT_KEY</title>
          <style>
              body { font-family: 'Calibri', sans-serif; margin: 30px; color: #333; }
              h1 { color: #2c3e50; border-bottom: 2px solid #34495e; padding-bottom: 5px; }
              h2 { color: #2c3e50; margin-top: 30px; }
              table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 30px; }
              th, td { border: 1px solid #bdc3c7; padding: 10px; text-align: left; }
              th { background-color: #f2f2f2; font-weight: bold; color: #2c3e50; }
              tr:nth-child(even) { background-color: #f9f9f9; }
          </style>
      </head>
      <body>
          <h1>SonarQube Detailed Quality Report</h1>
          <p><strong>Project Key:</strong> $PROJECT_KEY</p>
          <p><strong>Generated on:</strong> $date</p>

          <h2>🐛 Bugs Detailed List</h2>
          <table>
              <tr><th>File Path</th><th>Location</th><th>Description</th></tr>
              $bugRows
          </table>

          <h2>🔵 Vulnerabilities Detailed List</h2>
          <table>
              <tr><th>File Path</th><th>Location</th><th>Description</th></tr>
              $vulnRows
          </table>

          <h2>📝 Code Smells Detailed List</h2>
          <table>
              <tr><th>File Path</th><th>Location</th><th>Description</th></tr>
              $smellRows
          </table>
      </body>
      </html>
      "@

      # 8. Force write the file to the absolute root runner folder path with clean UTF-8 formatting
      $reportPath = Join-Path $pwd "sonar-analysis-report.html"
      $htmlContent | Out-File -FilePath $reportPath -Encoding utf8 -Force

      Write-Host "========================================="
      Write-Host "SUCCESS! HTML Report compiled perfectly."
      Write-Host "File saved to target absolute path: $reportPath"
      Write-Host "========================================="
*****************





