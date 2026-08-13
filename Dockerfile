# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set environment variables to optimize Python execution in Docker
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory inside the container
WORKDIR /app


# Install system dependencies, curl, gnupg2, and the Microsoft ODBC Driver
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    gnupg2 \
    apt-utils \
    build-essential \
    unixodbc-dev \
    && curl https://microsoft.com | apt-key add - \
    && curl https://microsoft.com > /etc/apt/sources.list.d/mssql-release.list \
    && apt-get update \
    && ACCEPT_EULA=Y apt-get install -y --no-install-recommends msodbcsql18 \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install system dependencies (essential for OCR pipelines and DB drivers)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    tesseract-ocr \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy and install dependencies first to maximize build cache efficiency
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all code files and database configuration
COPY app.py batch_process.py config.py constants.py db_config.py generate_csv.py logger_utils.py ocr_pipeline.py ./

# Recursively copy all subdirectories and their internal files
COPY ./annexure_trimmed ./annexure_trimmed
COPY ./classification ./classification
COPY ./governance ./governance
COPY ./helpers ./helpers
COPY ./postclassification ./postclassification
COPY ./preclassification ./preclassification
COPY ./processors ./processors

# Expose the network port for the application layer
EXPOSE 8000

# Set default execution command
CMD ["python", "app.py"]
