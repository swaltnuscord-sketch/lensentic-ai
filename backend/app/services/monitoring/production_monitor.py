class ProductionMonitor:

    def get_status(self):
        return {
            "active_jobs": 0,
            "queued_jobs": 0,
            "failed_jobs": 0,
            "providers_online": True,
        }