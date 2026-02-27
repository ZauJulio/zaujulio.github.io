---
title: "Building a Self-Organizing Map from Scratch in Python"
description: "A deep dive into implementing SOMs for unsupervised learning, with visualization and practical applications."
date: "2025-06-15"
tags: ["Python", "Machine Learning", "SOM", "AI", "Visualization"]
author: "Zau Julio"
readingTime: "8 min read"
canonical: ""
cover: ""
---

# Building a Self-Organizing Map from Scratch in Python

Self-Organizing Maps (SOMs) are a fascinating type of artificial neural network used for unsupervised learning. They produce a low-dimensional representation of high-dimensional data — perfect for visualization and clustering.

## What is a SOM?

A SOM is a type of competitive learning network. Unlike traditional neural networks, SOMs don't use backpropagation. Instead, they use a **neighborhood function** to preserve the topological properties of the input space.

## The Algorithm

The basic SOM training algorithm follows these steps:

1. **Initialize** the weight vectors randomly
2. **Select** a random input sample
3. **Find** the Best Matching Unit (BMU)
4. **Update** the BMU and its neighbors
5. **Repeat** until convergence

Here's the core implementation:

```python
import numpy as np

class SOM:
    def __init__(self, width: int, height: int, input_dim: int):
        self.width = width
        self.height = height
        self.weights = np.random.rand(width, height, input_dim)

    def find_bmu(self, sample: np.ndarray) -> tuple[int, int]:
        """Find the Best Matching Unit for a given sample."""
        distances = np.linalg.norm(self.weights - sample, axis=2)
        bmu_idx = np.unravel_index(distances.argmin(), distances.shape)
        return bmu_idx

    def update_weights(self, sample, bmu, learning_rate, radius):
        """Update weights using Gaussian neighborhood function."""
        for i in range(self.width):
            for j in range(self.height):
                dist = np.sqrt((i - bmu[0])**2 + (j - bmu[1])**2)
                if dist <= radius:
                    influence = np.exp(-dist**2 / (2 * radius**2))
                    self.weights[i, j] += (
                        learning_rate * influence * (sample - self.weights[i, j])
                    )
```

## Visualization

One of the most powerful aspects of SOMs is their ability to create meaningful 2D visualizations of complex data:

```python
import matplotlib.pyplot as plt

def plot_som(som: SOM, data: np.ndarray):
    """Plot the SOM weight map with data projections."""
    fig, ax = plt.subplots(figsize=(10, 10))

    # Plot U-Matrix
    u_matrix = np.zeros((som.width, som.height))
    for i in range(som.width):
        for j in range(som.height):
            neighbors = []
            if i > 0: neighbors.append(som.weights[i-1, j])
            if i < som.width-1: neighbors.append(som.weights[i+1, j])
            if j > 0: neighbors.append(som.weights[i, j-1])
            if j < som.height-1: neighbors.append(som.weights[i, j+1])
            u_matrix[i, j] = np.mean([
                np.linalg.norm(som.weights[i, j] - n) for n in neighbors
            ])

    ax.imshow(u_matrix, cmap='bone_r', interpolation='bilinear')
    ax.set_title('U-Matrix Visualization')
    plt.show()
```

## Interactive Demo

You can try a live SOM visualization below:

<!-- Embed example: CodeSandbox / StackBlitz iframe -->
<!-- <iframe src="https://codesandbox.io/embed/your-som-demo" style="width:100%; height:500px; border:0; border-radius:8px; overflow:hidden;" title="SOM Demo"></iframe> -->

## Real-World Applications

| Application | Domain | Data Type |
|-------------|--------|-----------|
| Customer segmentation | Marketing | Behavioral data |
| Image compression | Computer Vision | Pixel values |
| Anomaly detection | Security | Network traffic |
| Document clustering | NLP | TF-IDF vectors |

## Conclusion

SOMs are an elegant solution for exploring high-dimensional data. Their ability to preserve topology makes them uniquely suited for visualization tasks that other dimensionality reduction techniques (like PCA or t-SNE) handle differently.

> The beauty of SOMs lies in their simplicity — a competitive learning rule combined with neighborhood preservation creates surprisingly powerful representations.

Check out my [ZSOM implementation](https://github.com/ZauJulio/ZSOM) for a complete, production-ready SOM library in Python.
