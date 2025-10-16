# Project Setup Guide

This guide explains how to set up the project, install dependencies, configure the embedding model, and build using **Bun**.

---

## Setup Embedding Model

1. Create transformers folder
```shell
mkdir -p public/transformers
cd public/transformers
```

2. Clone the model repository
```shell
git clone https://huggingface.co/Xenova/bge-base-en-v1.5
```

3. Remove existing ONNX models
```shell
rm -rf public/transformers/Xenova/bge-base-en-v1.5/onnx/*
```

4. Manually download the quantized model from [huggingface](https://huggingface.co/Xenova/bge-base-en-v1.5) and place it inside:
```
public/transformers/Xenova/bge-base-en-v1.5/onnx/
```

## Project Setup

1. Install Bun. If you don’t have Bun installed yet:
```shell
curl -fsSL https://bun.sh/install | bash
```
2. Verify the Installation
```shell
bun --version
```
3. Install Dependencies
```shell
bun install
```
4. Build Project
```shell
bun run build
```
5. Open your [chrome extension](chrome://extensions/), Click ****"Load Unpacked"**** and select the project's build folder