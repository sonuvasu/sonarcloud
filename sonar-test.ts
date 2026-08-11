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
