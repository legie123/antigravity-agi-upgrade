#!/bin/bash
PROJECT="${GCP_PROJECT:-your-project-id}"
SERVICE="${GCP_SERVICE:-trade-ai}"
SERVICE_STATUS=$(gcloud run services describe "$SERVICE" --format="value(status.conditions[0].status)" 2>&1)
echo "Status: $SERVICE_STATUS"
