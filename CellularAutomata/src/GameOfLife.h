#pragma once

#include "CellularAutomaton.h"

class GameOfLife : public CellularAutomaton
{
public:
	GameOfLife(int width, int height, const std::string& fragShaderPath);
};