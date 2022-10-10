class NeuralNetwork {
    //neuralCounts = [a,b,c,d....] where a = # of neural in the first level, b = # of neural in the second level. .so on so forth
    constructor(neuralCounts) {
        this.levels = [];
        for (let i = 0; i < neuralCounts.length - 1; i++) {
            this.levels.push(new Level(neuralCounts[i], neuralCounts[i + 1]));
        }
    }

    static feedForward(givenInputs, network) {
        // console.table(network.levels[0]);
        let outputs = Level.feedForward(givenInputs, network.levels[0]);

        for (let i = 1; i < network.levels.length; i++) {
            outputs = Level.feedForward(outputs, network.levels[i]);
            // console.table(network.levels[i]);
        }
        return outputs;
    }


    static mutate(network, amount = 1) {
        network.levels.forEach(level => {
            for (let i = 0; i < level.biases.length; i++) {
                level.biases[i] = lerp(
                    level.biases[i],
                    Math.random() * 2 - 1,
                    amount
                )
            }
            for (let i = 0; i < level.weights.length; i++) {
                for (let j = 0; j < level.weights[i].length; j++) {
                    level.weights[i][j] = lerp(
                        level.weights[i][j],
                        Math.random() * 2 - 1,
                        amount
                    )
                }
            }
        });
    }
}

class Level {
    constructor(inputCount, outputCount) {
        //we need 2 arrays, one is for input layer and the other one is for the output layer
        this.inputs = new Array(inputCount);
        this.outputs = new Array(outputCount);
        this.biases = new Array(outputCount);

        //the weight is to define connections
        this.weights = [];

        for (let i = 0; i < inputCount; i++) {
            this.weights[i] = new Array(outputCount);
        }

        Level.randomize(this);
    }

    // we want to serialise this object. so we need to set static as normal method doesn't serialise object
    static randomize(level) {
        // console.table(level.outputs.length);
        for (let i = 0; i < level.inputs.length; i++) {
            for (let j = 0; j < level.outputs.length; j++) {
                level.weights[i][j] = Math.random() * 2 - 1; //we need numbers between -1 and 1
                //we want negative value is because we want the car to have signals of "don't do something" which will have a negative weight associate with it

            }
        }
        // console.log(level.weights);
        for (let i = 0; i < level.biases.length; i++) {
            level.biases[i] = Math.random() * 2 - 1;
        }
        // console.log(level.biases);
    }

    //given the input, this methods figure out the outputs
    static feedForward(givenInputs, level) {
        //assign the inputs(from senser) to the level input
        // console.table(level);
        for (let i = 0; i < level.inputs.length; i++) {
            level.inputs[i] = givenInputs[i];
        }
        //caclulate and assign the outputs to level outputs
        for (let i = 0; i < level.outputs.length; i++) {
            let sum = 0;

            for (let j = 0; j < level.inputs.length; j++) {
                // console.log(sum);
                // console.log(i, j);
                sum += level.weights[j][i] * level.inputs[j];
            }
            // console.log(sum);
            if (sum > level.biases[i]) {
                level.outputs[i] = 1;
            } else {
                level.outputs[i] = 0;
            }
        }
        return level.outputs;
    }
}