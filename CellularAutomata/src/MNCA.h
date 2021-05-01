#pragma once

#include "CellularAutomaton.h"
#include <SFML/Graphics.hpp>
#include <random>

class MNCA : public CellularAutomaton
{
private:
	sf::Clock clock;
	int frame = 0;
	sf::Vector2f mousePos;

public:
	MNCA(int width, int height, const std::string& fragShaderPath);
	void UpdateMousePos(sf::Vector2f pos);
	void EarlyUpdate() override;
};