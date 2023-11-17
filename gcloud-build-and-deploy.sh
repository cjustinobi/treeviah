#! /bin/bash

export PROJECT_ID=treeviah
export REGION=us-east1
export CONNECTION_NAME=treeviah:us-central1:myinstance

gcloud builds submit \
  --tag gcr.io/$PROJECT_ID/poll \
  --project $PROJECT_ID

gcloud run deploy poll \
  --image gcr.io/$PROJECT_ID/poll \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --add-cloudsql-instances $CONNECTION_NAME \
  --project $PROJECT_ID

  # gcloud run deploy treeviah \
  # --image gcr.io/treeviah/treeviah \
  # --platform managed \
  # --region us-east1 \
  # --allow-unauthenticated \
  # --add-cloudsql-instances treeviah:us-central1:myinstance \
  # --project treeviah

  gcloud builds submit --tag gcr.io/treeviah-404022/poll --project treeviah-404022