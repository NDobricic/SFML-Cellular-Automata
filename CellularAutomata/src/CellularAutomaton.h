#pragma once

#include <SFML\Graphics.hpp>
#include "DoubleBufferedTexture.h"
#include <string>

class CellularAutomaton
{
private:
    DoubleBufferedTexture simulation;

    DoubleBufferedTexture trails;

    DoubleBufferedTexture output;

    sf::Shader shader;
    sf::Shader trailShader;
    sf::Shader additionShader;
    sf::Shader multiplyShader;
    sf::Shader blurShader;

    bool enableColorFilter;
    sf::Color colorFilter;

    bool showTrails;

    bool enableBlur;

    void InitTexture(sf::RenderTexture*& texture, int w, int h);
    void SwapTextures(sf::RenderTexture*& a, sf::RenderTexture*& b);

public:
    CellularAutomaton(int width, int height, const std::string& fragShaderPath);

    void SetInitialState(const sf::Image& image);
    void Update();

    const sf::Texture& GetTexture();

    void ShowTrails(bool enabled);
    void SetColorFilter(const sf::Color& color);
    void EnableBlur(bool enabled);

protected:
    int w, h;

    virtual void EarlyUpdate();
    virtual void LateUpdate();

    const sf::Texture& GetBaseTexture();
    template<typename T>
    void SetShaderUniform(const std::string& name, const T& value)
    {
        shader.setUniform(name, value);
    }
};
