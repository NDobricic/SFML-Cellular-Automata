#include "CellularAutomaton.h"

void CellularAutomaton::SwapTextures()
{
    sf::RenderTexture* temp = currentGen;
    currentGen = nextGen;
    nextGen = temp;
}

CellularAutomaton::CellularAutomaton(int width, int height, const std::string& fragShaderPath)
{
    currentGen = new sf::RenderTexture();
    currentGen->create(width, height);
    currentGen->setRepeated(true);
    currentGen->display();

    nextGen = new sf::RenderTexture();
    nextGen->create(width, height);
    nextGen->setRepeated(true);
    nextGen->display();

    canvas.setPrimitiveType(sf::Quads);
    canvas.resize(4);
    canvas[0] = sf::Vertex(sf::Vector2f(0, 0), sf::Color::White, sf::Vector2f(0, 0));
    canvas[1] = sf::Vertex(sf::Vector2f(0, height), sf::Color::White, sf::Vector2f(0, height));
    canvas[2] = sf::Vertex(sf::Vector2f(width, height), sf::Color::White, sf::Vector2f(width, height));
    canvas[3] = sf::Vertex(sf::Vector2f(width, 0), sf::Color::White, sf::Vector2f(width, 0));

    shader.loadFromFile(fragShaderPath, sf::Shader::Fragment);
    
    w = width;
    h = height;

    states.shader = &shader;
}

CellularAutomaton::~CellularAutomaton()
{
    delete currentGen;
    delete nextGen;
}

void CellularAutomaton::SetInitialState(const sf::Image& image)
{
    sf::Texture* startTexture = new sf::Texture;
    startTexture->loadFromImage(image);

    currentGen->draw(canvas, startTexture);
    currentGen->display();

    states.texture = &currentGen->getTexture();

    delete startTexture;
}

void CellularAutomaton::Update()
{
    EarlyUpdate();

    states.texture = &currentGen->getTexture();

    nextGen->draw(canvas, states);
    nextGen->display();

    SwapTextures();

    LateUpdate();
}

const sf::Texture& CellularAutomaton::GetTexture()
{
    return currentGen->getTexture();
}

void CellularAutomaton::EarlyUpdate() {}

void CellularAutomaton::LateUpdate() {}
