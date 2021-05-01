#pragma once

#include <SFML\Graphics.hpp>
#include <string>

class CellularAutomaton
{
private:
    sf::RenderTexture* currentGen;
    sf::RenderTexture* nextGen;

    sf::VertexArray canvas;

    sf::Shader shader;

    sf::RenderStates states;

    void SwapTextures();

public:
    CellularAutomaton(int width, int height, const std::string& fragShaderPath);
    ~CellularAutomaton();

    void SetInitialState(const sf::Image& image);
    void Update();

    const sf::Texture& GetTexture();

    virtual void EarlyUpdate();
    virtual void LateUpdate();

protected:
    int w, h;

    template<typename T>
    void SetShaderUniform(const std::string& name, T value)
    {
        shader.setUniform(name, value);
    }
};
