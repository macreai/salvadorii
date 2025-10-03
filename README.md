# Setup Embedding Model

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