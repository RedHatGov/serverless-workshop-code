import numpy as np
import pandas as pd
import pickle, boto3, os
from scikit-learn.naive_bayes import MultinomialNB
from scikit-learn.feature_extraction.text import CountVectorizer

# Set variables
bucket_name=os.getenv("BUCKET_NAME")
model_file_name=os.getenv("MODEL_FILE_NAME")

# Data set: https://www.kaggle.com/vbmokin/nlp-with-disaster-tweets-cleaning-data
# Read training data set
train_df = pd.read_csv("train.csv")

# Create word vector
cv = CountVectorizer()
train_vectors = cv.fit_transform(train_df["text"])

# Create model using Multinomial Naive Bayes
clf = MultinomialNB()
clf.fit(train_vectors, train_df["target"])

# Save vectorizer and model
# Upload vectorizer and model to S3
s3 = boto3.resource('s3')
s3.Bucket(bucket_name).put_object(Key=model_file_name, Body = pickle.dumps((cv,clf)))
