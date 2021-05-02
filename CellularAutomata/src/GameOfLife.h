#pragma once

#include "CellularAutomaton.h"

class GameOfLife : public CellularAutomaton
{
private:
	int frames;
public:
	GameOfLife(int width, int height, const std::string& fragShaderPath);
	void EarlyUpdate() override;
};