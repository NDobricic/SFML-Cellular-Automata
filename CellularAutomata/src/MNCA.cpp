#include "MNCA.h"

MNCA::MNCA(int width, int height, const std::string& fragShaderPath) : CellularAutomaton(width, height, fragShaderPath)
{
	SetShaderUniform("resolution", sf::Vector2f(w, h));

	frame = 0;

	mousePos.x = 0;
	mousePos.y = 0;

	clock.restart();
}

void MNCA::UpdateMousePos(sf::Vector2f pos)
{
	mousePos = pos;
}

void MNCA::EarlyUpdate()
{
	SetShaderUniform("time", (float)clock.getElapsedTime().asMilliseconds());
	SetShaderUniform("mouse", mousePos);
	SetShaderUniform("frames", frame);
	SetShaderUniform("random1", (float)rand() / (float)RAND_MAX);
}
