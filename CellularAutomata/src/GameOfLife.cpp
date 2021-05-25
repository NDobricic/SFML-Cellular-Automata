#include "GameOfLife.h"

GameOfLife::GameOfLife(int width, int height, const std::string& fragShaderPath) : CellularAutomaton(width, height, fragShaderPath)
{
	SetShaderUniform("tex_size", sf::Vector2f(w, h));
	SetShaderUniform("resolution", sf::Vector2f(w, h));
	frames = 0;
}

void GameOfLife::EarlyUpdate()
{
	SetShaderUniform("frames", frames);
	SetShaderUniform("time", (float)rand());
	SetShaderUniform("random1", (float)rand() / (float)RAND_MAX);

	SetShaderUniform("tex0_in", GetBaseTexture());
	SetShaderUniform("txdata", GetBaseTexture());
	frames++;
}
