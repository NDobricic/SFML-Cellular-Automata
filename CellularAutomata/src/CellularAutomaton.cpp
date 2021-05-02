#include "CellularAutomaton.h"

void CellularAutomaton::InitTexture(sf::RenderTexture*& texture, int w, int h)
{
    texture = new sf::RenderTexture();
    texture->create(w, h);
    texture->setRepeated(true);
    texture->display();
}

void CellularAutomaton::SwapTextures(sf::RenderTexture*& a, sf::RenderTexture*& b)
{
    sf::RenderTexture* temp = a;
    a = b;
    b = temp;
}

CellularAutomaton::CellularAutomaton(int width, int height, const std::string& fragShaderPath)
    : simulation(width, height), trails(width, height), output(width, height)
{
    shader.loadFromFile(fragShaderPath, sf::Shader::Fragment);
    trailShader.loadFromFile("res/shaders/trails.frag", sf::Shader::Fragment);
    trailShader.setUniform("tex_size", sf::Vector2f(width, height));
    trailShader.setUniform("trailPersistance", 0.98f);

    additionShader.loadFromFile("res/shaders/utility/addTextures.frag", sf::Shader::Fragment);
    additionShader.setUniform("tex_size", sf::Vector2f(width, height));

    multiplyShader.loadFromFile("res/shaders/utility/multiplyByColor.frag", sf::Shader::Fragment);
    multiplyShader.setUniform("tex_size", sf::Vector2f(width, height));

    blurShader.loadFromFile("res/shaders/post-processing/boxBlur2.frag", sf::Shader::Fragment);
    blurShader.setUniform("tex_size", sf::Vector2f(width, height));
    
    w = width;
    h = height;

    showTrails = false;
    enableColorFilter = false;
    colorFilter = sf::Color::White;
    enableBlur = false;
}

void CellularAutomaton::SetInitialState(const sf::Image& image)
{
    simulation.SetImage(image);
}

void CellularAutomaton::Update()
{
    EarlyUpdate();

    simulation.ApplyFragmentShader(shader);

    trailShader.setUniform("currentGen", simulation.GetActiveTexture());
    trailShader.setUniform("trailTex", trails.GetActiveTexture());
    trails.ApplyFragmentShader(trailShader);

    LateUpdate();
}

const sf::Texture& CellularAutomaton::GetTexture()
{
    if (!showTrails && !enableBlur && !enableColorFilter)
        return simulation.GetActiveTexture();

    if (showTrails)
    {
        additionShader.setUniform("tex0_in", simulation.GetActiveTexture());
        additionShader.setUniform("tex1_in", trails.GetActiveTexture());
        output.ApplyFragmentShader(additionShader);
    }
    else
    {
        multiplyShader.setUniform("tex0_in", simulation.GetActiveTexture());
        multiplyShader.setUniform("color", (sf::Glsl::Vec4)sf::Color::White);
        output.ApplyFragmentShader(multiplyShader);
    }

    if (enableBlur)
    {
        blurShader.setUniform("tex0_in", output.GetActiveTexture());
        output.ApplyFragmentShader(blurShader);
    }

    if (enableColorFilter)
    {
        multiplyShader.setUniform("tex0_in", output.GetActiveTexture());
        multiplyShader.setUniform("color", (sf::Glsl::Vec4)colorFilter);
        output.ApplyFragmentShader(multiplyShader);
    }

    return output.GetActiveTexture();
}

const sf::Texture& CellularAutomaton::GetBaseTexture()
{
    return simulation.GetActiveTexture();
}

void CellularAutomaton::ShowTrails(bool enabled)
{
    showTrails = enabled;
}

void CellularAutomaton::SetColorFilter(const sf::Color& color)
{
    colorFilter = color;
    enableColorFilter = true;
}

void CellularAutomaton::EnableBlur(bool enabled)
{
    enableBlur = enabled;
}

void CellularAutomaton::EarlyUpdate() {}

void CellularAutomaton::LateUpdate() {}
