import{c as d,u as p}from"./useTranslation-DeY4xK7r.js";import{r as a}from"./chunk-EPOLDU6W-gU6CAgNk.js";import{l as t,e as m}from"./markdown-9U5NpvZk.js";import{b as u,a as c}from"./articles.pt-BR-Do4tPJwu.js";/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=[["path",{d:"M15 18h-5",key:"95g1m2"}],["path",{d:"M18 14h-8",key:"sponae"}],["path",{d:"M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2",key:"39pd36"}],["rect",{width:"8",height:"4",x:"10",y:"6",rx:"1",key:"aywv1n"}]],B=d("newspaper",h),g=`---
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

\`\`\`python
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
\`\`\`

## Visualization

One of the most powerful aspects of SOMs is their ability to create meaningful 2D visualizations of complex data:

\`\`\`python
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
\`\`\`

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
`,s=`---
title: "Construindo um Mapa Auto-Organizável do Zero em Python"
description: "Uma immersion profunda na implementação de SOMs para aprendizado não supervisionado, com visualização e aplicações práticas."
date: "2025-06-15"
tags: ["Python", "Machine Learning", "SOM", "IA", "Visualização"]
author: "Zau Julio"
readingTime: "8 min de leitura"
canonical: ""
cover: ""
---

# Construindo um Mapa Auto-Organizável do Zero em Python

Mapas Auto-Organizáveis (SOMs) são um tipo fascinante de rede neural artificial usada para aprendizado não supervisionado. Eles produzem uma representação de baixa dimensionalidade de dados de alta dimensionalidade — perfeito para visualização e clusterização.

## O que é um SOM?

Um SOM é um tipo de rede de aprendizado competitivo. Diferentemente das redes neurais tradicionais, SOMs não usam backpropagation. Em vez disso, eles usam uma **função de vizinhança** para preservar as propriedades topológicas do espaço de entrada.

## O Algoritmo

O algoritmo básico de treinamento do SOM segue estes passos:

1. **Inicialize** os vetores de peso aleatoriamente
2. **Selecione** uma amostra de entrada aleatória
3. **Encontre** a Unidade de Melhor Correspondência (BMU)
4. **Atualize** o BMU e seus vizinhos
5. **Repita** até a convergência

Aqui está a implementação central:

\`\`\`python
import numpy as np

class SOM:
    def __init__(self, width: int, height: int, input_dim: int):
        self.width = width
        self.height = height
        self.weights = np.random.rand(width, height, input_dim)

    def find_bmu(self, sample: np.ndarray) -> tuple[int, int]:
        """Encontra a Unidade de Melhor Correspondência para uma amostra."""
        distances = np.linalg.norm(self.weights - sample, axis=2)
        bmu_idx = np.unravel_index(distances.argmin(), distances.shape)
        return bmu_idx

    def update_weights(self, sample, bmu, learning_rate, radius):
        """Atualiza os pesos usando função de vizinhança Gaussiana."""
        for i in range(self.width):
            for j in range(self.height):
                dist = np.sqrt((i - bmu[0])**2 + (j - bmu[1])**2)
                if dist <= radius:
                    influence = np.exp(-dist**2 / (2 * radius**2))
                    self.weights[i, j] += (
                        learning_rate * influence * (sample - self.weights[i, j])
                    )
\`\`\`

## Visualização
`,f=Object.assign({"../../content/articles/building-a-som-from-scratch.md":g,"../../content/articles/building-a-som-from-scratch.pt-BR.md":s}),w=Object.assign({"../../content/articles/building-a-som-from-scratch.pt-BR.md":s}),M=t(f),b=t(w),y=u.articles,v=c.articles;function o(n,e){const i=e.find(l=>l.meta.slug===n.slug);return{...n,content:(i==null?void 0:i.content)||n.description,readingTime:i?m(i.content):n.readingTime}}const r=y.map(n=>o(n,M)),_=v.map(n=>o(n,b));function S(){const{i18n:n}=p(),e=n.language||"en";return a.useMemo(()=>e==="pt-BR"?_:r,[e])}function k(){const n=S();return a.useMemo(()=>Array.from(new Set(n.flatMap(e=>e.tags||[]).filter(Boolean))),[n])}const O=r;Array.from(new Set(O.flatMap(n=>n.tags||[]).filter(Boolean)));export{B as N,k as a,S as u};
