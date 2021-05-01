#include "GameOfLife.h"

GameOfLife::GameOfLife(int width, int height, const std::string& fragShaderPath) : CellularAutomaton(width, height, fragShaderPath)
{
	SetShaderUniform("tex_size", sf::Vector2f(w, h));
}
