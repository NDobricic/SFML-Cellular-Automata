#include <SFML/Graphics.hpp>
#include <random>

#include "GameOfLife.h"
#include "MNCA.h"

/*----------------------------------------------------------------------/
SIMULATION CONTROLS:
- The simulation begins as soon as you start the application
- To pause/unpause the simulation use SPACE on your keyboard
- You can control the zoom using the scroll-wheel on your mouse
- You can drag the screen by holding the left mouse button
- Use ESCAPE on your keyboard to close the application
- Press R on your keyboard to reset the simulation
/----------------------------------------------------------------------*/

/*-------SIMULATION OPTIONS-------*/
const unsigned int WINDOW_WIDTH = 800;
const unsigned int WINDOW_HEIGHT = 600;

const unsigned int FPS_LIMIT = 0;
const bool ENABLE_VSYNC = true;

const bool FULLSCREEN = false;
/*--------------------------------*/

int clamp(int number, int min, int max)
{
    if (number < min)
        return min;

    if (number > max)
        return max;

    return number;
}

void RandomizeState(CellularAutomaton& ca)
{
    sf::Image* initialState = new sf::Image();
    initialState->create(WINDOW_WIDTH, WINDOW_HEIGHT);
    for (unsigned int y = 0; y < WINDOW_HEIGHT; y++)
        for (unsigned int x = 0; x < WINDOW_WIDTH; x++)
        {
            unsigned char color;

            color = ((rand() / 3231) % 2) * 255;

            //if ((x - 200) * (x - 200) + (y - 200) * (y - 200) < 250)
            //    color = 255;
            //else
            //    color = 0;

            //if (x == 200 && y == 200)
            //    color = 255;
            //else
            //    color = 0;

            initialState->setPixel(x, y, sf::Color(color, color, color, 255));
            //initialState->setPixel(x, y, sf::Color(rand() % 256, rand() % 256, rand() % 256, 255));
        }

    ca.SetInitialState(*initialState);

    delete initialState;
}

int main()
{
    srand(time(NULL));

    sf::RenderWindow window(sf::VideoMode(WINDOW_WIDTH, WINDOW_HEIGHT), "Cellular Automata", (FULLSCREEN == true) ? sf::Style::Fullscreen : sf::Style::Close);
    window.setVerticalSyncEnabled(ENABLE_VSYNC);
    window.setFramerateLimit(FPS_LIMIT);

    GameOfLife game(WINDOW_WIDTH, WINDOW_HEIGHT, "res/shaders/slackermanz/3.frag");
    //MNCA game(WINDOW_WIDTH, WINDOW_HEIGHT, "res/shaders/MNCA.frag");

    sf::Sprite* canvas = new sf::Sprite();

    sf::RenderStates states;

    RandomizeState(game);

    int cameraZoom = 0;
    sf::Vector2f cameraOffset(0, 0);

    sf::Shader camShader;
    camShader.loadFromFile("res/shaders/camera.frag", sf::Shader::Fragment);

    sf::Vector2f dragStart(0, 0);
    bool dragging = false;

    bool paused = false;

    while (window.isOpen())
    {
        sf::Event event;
        while (window.pollEvent(event))
        {
            switch (event.type)
            {
            case sf::Event::Closed:
                window.close();

            case sf::Event::MouseWheelScrolled:
                if (event.mouseWheelScroll.delta > 0)
                    cameraZoom += 1;
                else
                    cameraZoom -= 1;

                cameraZoom = clamp(cameraZoom, 0, 5);

                break;

            case sf::Event::MouseButtonPressed:
                if (event.mouseButton.button == sf::Mouse::Left)
                {
                    dragStart = (sf::Vector2f)sf::Mouse::getPosition();
                    dragging = true;
                }

                break;

            case sf::Event::MouseButtonReleased:
                if (event.mouseButton.button == sf::Mouse::Left)
                {
                    dragging = false;
                }

                break;

            case sf::Event::KeyPressed:
                if (event.key.code == sf::Keyboard::Escape)
                    window.close();
                else if (event.key.code == sf::Keyboard::Space)
                    paused = !paused;
                else if (event.key.code == sf::Keyboard::R)
                    RandomizeState(game);

                break;

            default:
                break;
            }
            if (event.type == sf::Event::Closed)
                window.close();
        }

        if (dragging)
        {
            sf::Vector2f offset = dragStart - (sf::Vector2f)sf::Mouse::getPosition();

            offset.x /= WINDOW_WIDTH;
            offset.y /= WINDOW_HEIGHT;

            offset.y *= -1;

            cameraOffset += offset / (float)(1 << cameraZoom);

            dragStart = (sf::Vector2f)sf::Mouse::getPosition();
        }

        camShader.setUniform("offset", cameraOffset);
        camShader.setUniform("zoom", cameraZoom);

        window.clear();

        //game.UpdateMousePos((sf::Vector2f)sf::Mouse::getPosition());
        if (!paused)
            game.Update();

        window.draw(sf::Sprite(game.GetTexture()), &camShader);
        window.display();
    }

    return EXIT_SUCCESS;
}