---
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

```python
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
```

## Visualização
