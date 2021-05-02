#include "DoubleBufferedTexture.h"

void DoubleBufferedTexture::InitTexture(sf::RenderTexture*& texture, int w, int h)
{
    texture = new sf::RenderTexture();
    texture->create(w, h);
    texture->setRepeated(true);
    texture->display();
}

void DoubleBufferedTexture::InitCanvas(int w, int h)
{
    canvas.setPrimitiveType(sf::Quads);
    canvas.resize(4);
    canvas[0] = sf::Vertex(sf::Vector2f(0, 0), sf::Color::White, sf::Vector2f(0, 0));
    canvas[1] = sf::Vertex(sf::Vector2f(0, w), sf::Color::White, sf::Vector2f(0, h));
    canvas[2] = sf::Vertex(sf::Vector2f(w, h), sf::Color::White, sf::Vector2f(w, h));
    canvas[3] = sf::Vertex(sf::Vector2f(w, 0), sf::Color::White, sf::Vector2f(w, 0));
}

void DoubleBufferedTexture::SwapTextures()
{
    sf::RenderTexture* temp = activeTexture;
    activeTexture = inactiveTexture;
    inactiveTexture = temp;
}

DoubleBufferedTexture::DoubleBufferedTexture(int width, int height)
{
    InitTexture(activeTexture, width, height);
    InitTexture(inactiveTexture, width, height);

    InitCanvas(width, height);
}

void DoubleBufferedTexture::SetImage(const sf::Image& image)
{
    sf::Texture* startTexture = new sf::Texture;
    startTexture->loadFromImage(image);

    activeTexture->draw(canvas, startTexture);
    activeTexture->display();

    delete startTexture;
}

const sf::Texture& DoubleBufferedTexture::GetActiveTexture()
{
	return activeTexture->getTexture();
}

const sf::Texture& DoubleBufferedTexture::GetInactiveTexture()
{
	return inactiveTexture->getTexture();
}

void DoubleBufferedTexture::ApplyFragmentShader(const sf::Shader& shader)
{
    inactiveTexture->draw(canvas, &shader);
    inactiveTexture->display();

    SwapTextures();
}

DoubleBufferedTexture::~DoubleBufferedTexture()
{
    delete activeTexture;
    delete inactiveTexture;
}
