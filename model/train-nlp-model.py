import numpy as np
import pandas as pd
import pickle
from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import CountVectorizer

# Retrieve the training data from https://www.kaggle.com/vbmokin/nlp-with-disaster-tweets-cleaning-data
# Read training data set
train_df = pd.read_csv("train.csv")

# Create word vector
cv = CountVectorizer()
train_vectors = cv.fit_transform(train_df["text"])

# Create model using Multinomial Naive Bayes
clf = MultinomialNB()
clf.fit(train_vectors, train_df["target"])

# Save vectorizer and model
with open('model.pkl', 'wb') as f:
    pickle.dump((cv, clf), f)
