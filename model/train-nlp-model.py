import numpy as np
import pandas as pd
from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import CountVectorizer

# Read training data set
train_df = pd.read_csv("train.csv")

# Create word vector
cv = CountVectorizer()
train_vectors = cv.fit_transform(train_df["text"])

# Create model using Multinomial Naive Bayes
clf = MultinomialNB()
clf.fit(train_vectors, train_df["target"])

# Test prediction
inputs = ["nothing to see here", "massive flooding and thunderstorms taking place here"]
print(clf.predict(cv.transform(inputs)))  # Do not use .fit_transform() here
