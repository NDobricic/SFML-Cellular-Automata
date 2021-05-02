#pragma once

#include "SFML/Graphics.hpp"
#include <string>

class DoubleBufferedTexture
{
private:
	sf::RenderTexture* activeTexture;
	sf::RenderTexture* inactiveTexture;

	sf::VertexArray canvas;

	void InitTexture(sf::RenderTexture*& texture, int w, int h);
	void InitCanvas(int w, int h);
	void SwapTextures();

public:
	DoubleBufferedTexture(int width, int height);
	void SetImage(const sf::Image& image);

	const sf::Texture& GetActiveTexture();
	const sf::Texture& GetInactiveTexture();

	void ApplyFragmentShader(const sf::Shader& shader);

	~DoubleBufferedTexture();
};