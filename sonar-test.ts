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





