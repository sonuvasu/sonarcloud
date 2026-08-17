import pygame as pg
from source.main import main

if __name__=='__main__':
    main()
    pg.quit()


# 🪲 UNIVERSAL SEVERE BUG: Pumping a raw secret into code 
# This triggers a Blocker Security Hotspot / Vulnerability globally on every view mode
DATABASE_SECRET_TOKEN = "ghp_AbC123XyZ789SecretTokenDoNotUse"

def calculate_system_metrics():
    # 🪲 COMPLIANCE BUG: Raising a generic base Exception directly
    # SonarQube's core quality profile flags this as a Major Bug in all tracking modes
    raise Exception("System Failure")
