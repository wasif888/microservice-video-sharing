# Microservice Video Sharing App 🎥

Welcome to the **Microservice Video Sharing App**! This project is a cloud-based video-sharing platform built using the MERN stack and deployed on AWS, leveraging a microservice architecture for scalability and efficiency. Authenticated users can upload and download videos, with each service hosted in separate Docker containers on EC2 instances.

---

## Table of Contents
- [Features](#features)
- [Project Architecture](#project-architecture)


---

## Features 📌

- **User Authentication**: Secure user login and registration with AWS Cognito.
- **Video Upload & Download**: Authenticated users can upload and download videos.
- **Video Metadata Management**: Store and retrieve metadata in DynamoDB.
- **Asynchronous Processing**: Use SQS for background task processing.
- **Scalable Architecture**: Separate EC2 instances for each service with Docker for containerization.
- **Highly Available**: AWS Route 53 for DNS management and API Gateway for seamless access to services.

---

## Project Architecture 🏗️

This project uses a **microservice architecture** to isolate and scale individual services based on demand. Each service communicates over HTTP and is managed by an **API Gateway** for centralized routing.

```plaintext
┌───────────────────────────────────────────────────────────────────────┐
│                               Frontend                                │
│   (React app with Axios for communication with backend services)      │
└───────────────────────────────────────────────────────────────────────┘
                                   │
                                   │
        ┌─────────────── AWS API Gateway ────────────────┐
        │                                                │
 ┌───────────────┐ ┌──────────────┐ ┌────────────────┐ ┌────────────┐
 │ Auth Service  │ │ Upload Svc   │ │ Download Svc   │ │ Metadata   │
 │ (Cognito)     │ │ (S3)         │ │ (S3)          │ │ Service    │
 │               │ │              │ │               │ │ (DynamoDB) │
 └───────────────┘ └──────────────┘ └────────────────┘ └────────────┘
                                   │
                          ┌────────┴──────┐
                          │  Queue Svc    │
                          │  (SQS)        │
                          └───────────────┘
