var SVC = function(nClasses, nRows, vectors, coefficients, intercepts, weights, kernel, gamma, coef0, degree) {

    this.nClasses = nClasses;
    this.classes = new Array(nClasses);
    for (var i = 0; i < nClasses; i++) {
        this.classes[i] = i;
    }
    this.nRows = nRows;
    this.vectors = vectors;
    this.coefficients = coefficients;
    this.intercepts = intercepts;
    this.weights = weights;
    this.kernel = kernel.toUpperCase();
    this.gamma = gamma;
    this.coef0 = coef0;
    this.degree = degree;
    this.predict = function(features) {
    
        var kernels = new Array(vectors.length);
        var kernel;
        switch (this.kernel) {
            case 'LINEAR':
                // <x,x'>
                for (var i = 0; i < this.vectors.length; i++) {
                    kernel = 0.;
                    for (var j = 0; j < this.vectors[i].length; j++) {
                        kernel += this.vectors[i][j] * features[j];
                    }
                    kernels[i] = kernel;
                }
                break;
            case 'POLY':
                // (y<x,x'>+r)^d
                for (var i = 0; i < this.vectors.length; i++) {
                    kernel = 0.;
                    for (var j = 0; j < this.vectors[i].length; j++) {
                        kernel += this.vectors[i][j] * features[j];
                    }
                    kernels[i] = Math.pow((this.gamma * kernel) + this.coef0, this.degree);
                }
                break;
            case 'RBF':
                // exp(-y|x-x'|^2)
                for (var i = 0; i < this.vectors.length; i++) {
                    kernel = 0.;
                    for (var j = 0; j < this.vectors[i].length; j++) {
                        kernel += Math.pow(this.vectors[i][j] - features[j], 2);
                    }
                    kernels[i] = Math.exp(-this.gamma * kernel);
                }
                break;
            case 'SIGMOID':
                // tanh(y<x,x'>+r)
                for (var i = 0; i < this.vectors.length; i++) {
                    kernel = 0.;
                    for (var j = 0; j < this.vectors[i].length; j++) {
                        kernel += this.vectors[i][j] * features[j];
                    }
                    kernels[i] = Math.tanh((this.gamma * kernel) + this.coef0);
                }
                break;
        }
    
        var starts = new Array(this.nRows);
        for (var i = 0; i < this.nRows; i++) {
            if (i != 0) {
                var start = 0;
                for (var j = 0; j < i; j++) {
                    start += this.weights[j];
                }
                starts[i] = start;
            } else {
                starts[0] = 0;
            }
        }
    
        var ends = new Array(this.nRows);
        for (var i = 0; i < this.nRows; i++) {
            ends[i] = this.weights[i] + starts[i];
        }
    
        if (this.nClasses == 2) {
    
            for (var i = 0; i < kernels.length; i++) {
                kernels[i] = -kernels[i];
            }
    
            var decision = 0.;
            for (var k = starts[1]; k < ends[1]; k++) {
                decision += kernels[k] * this.coefficients[0][k];
            }
            for (var k = starts[0]; k < ends[0]; k++) {
                decision += kernels[k] * this.coefficients[0][k];
            }
            decision += this.intercepts[0];
    
            if (decision > 0) {
                return 0;
            }
            return 1;
    
        }
    
        var decisions = new Array(this.intercepts.length);
        for (var i = 0, d = 0, l = this.nRows; i < l; i++) {
            for (var j = i + 1; j < l; j++) {
                var tmp = 0.;
                for (var k = starts[j]; k < ends[j]; k++) {
                    tmp += this.coefficients[i][k] * kernels[k];
                }
                for (var k = starts[i]; k < ends[i]; k++) {
                    tmp += this.coefficients[j - 1][k] * kernels[k];
                }
                decisions[d] = tmp + this.intercepts[d];
                d++;
            }
        }
    
        var votes = new Array(this.intercepts.length);
        for (var i = 0, d = 0, l = this.nRows; i < l; i++) {
            for (var j = i + 1; j < l; j++) {
                votes[d] = decisions[d] > 0 ? i : j;
                d++;
            }
        }
    
        var amounts = new Array(this.nClasses).fill(0);
        for (var i = 0, l = votes.length; i < l; i++) {
            amounts[votes[i]] += 1;
        }
    
        var classVal = -1, classIdx = -1;
        for (var i = 0, l = amounts.length; i < l; i++) {
            if (amounts[i] > classVal) {
                classVal = amounts[i];
                classIdx= i;
            }
        }
        return this.classes[classIdx];
    
    }

};

function bmiPredict(body) {
        if (body.length !== 3)
        return{
            message: "input not enough"
        }
        var features = body;
        var vectors = [[-1.030463813097332, 1.076896324164174, -1.628921033626001], [0.9704367948586524, -0.43815196531834427, -1.5357599793722978], [0.9704367948586524, 1.2587021189020762, -1.628921033626001], [-1.030463813097332, 0.7132847346883695, -1.7531357726309384], [-1.030463813097332, 1.3799059820606776, -1.628921033626001], [0.9704367948586524, 0.7738866662676702, -1.7531357726309384], [0.9704367948586524, 0.5920808715297681, -1.4736526098698286], [0.9704367948586524, 0.3496731452125652, -1.628921033626001], [-1.030463813097332, -0.1351423074218406, -1.7531357726309384], [0.9704367948586524, 1.501109845219279, -1.4115452403673598], [-1.030463813097332, 1.501109845219279, -1.1631157623574846], [0.9704367948586524, -0.01393844426323917, -1.6599747183772353], [-1.030463813097332, 1.076896324164174, -1.5357599793722978], [-1.030463813097332, 0.4708770083711667, -1.6910284031284697], [-1.030463813097332, 1.743517571536482, -0.23150521982045252], [0.9704367948586524, 0.4708770083711667, -0.8525789148451407], [0.9704367948586524, -0.0745403758425399, -1.628921033626001], [0.9704367948586524, 1.3193040504813769, -0.5109883825815621], [0.9704367948586524, -1.0441712811113517, -0.8836325995963751], [0.9704367948586524, 0.6526828031090688, -0.8215252300939062], [-1.030463813097332, 0.834488597846971, -0.728364175840203], [0.9704367948586524, 0.16786735047466303, -0.7594178605914375], [0.9704367948586524, 0.8950905294262718, -0.7904715453426718], [-1.030463813097332, -0.3169481021597428, -1.194169447108719], [0.9704367948586524, -0.498753896897645, -1.3183841861136567], [0.9704367948586524, -0.6199577600562465, -1.722082087879704], [-1.030463813097332, -0.9229674179527502, -1.5357599793722978], [0.9704367948586524, -1.3471809390078553, -1.628921033626001], [0.9704367948586524, -0.8017635547941487, -1.4425989251185942], [0.9704367948586524, 1.2587021189020762, -1.194169447108719], [0.9704367948586524, -0.0745403758425399, -0.573095752084031], [0.9704367948586524, -0.37755003373904356, -1.1010083928550158], [-1.030463813097332, 0.4708770083711667, -0.728364175840203], [-1.030463813097332, 0.22846928205396375, -0.5109883825815621], [0.9704367948586524, -0.37755003373904356, -1.1010083928550158], [-1.030463813097332, 1.1374982557434747, -0.07623679606428047], [-1.030463813097332, -0.25634617058044207, -1.1320620776062502], [-1.030463813097332, -1.831996391642261, -1.6910284031284697], [0.9704367948586524, 1.4405079136399783, 0.14113899719436038], [0.9704367948586524, 0.834488597846971, -0.6352031215864997], [0.9704367948586524, -1.2259770758492539, -1.4425989251185942], [0.9704367948586524, 0.7132847346883695, -0.6973104910889686], [0.9704367948586524, 1.076896324164174, -0.5109883825815621], [-1.030463813097332, -1.0441712811113517, -1.1320620776062502], [0.9704367948586524, -0.1351423074218406, 0.26535373619929803], [0.9704367948586524, -0.8017635547941487, -1.256276816611188], [0.9704367948586524, 0.7132847346883695, -0.6973104910889686], [-1.030463813097332, 1.501109845219279, -0.2625589045716869], [0.9704367948586524, 0.8950905294262718, -0.20045153506921812], [0.9704367948586524, -0.498753896897645, -1.0078473386013127], [0.9704367948586524, -1.1653751442699531, -1.3183841861136567], [-1.030463813097332, 0.22846928205396375, -0.5109883825815621], [-1.030463813097332, 0.7738866662676702, -0.04518311131304606], [0.9704367948586524, -1.2865790074285546, -1.4115452403673598], [0.9704367948586524, -0.9229674179527502, -1.1010083928550158], [0.9704367948586524, -0.498753896897645, -1.194169447108719], [0.9704367948586524, 1.016294392584873, -0.13834416556674928], [-1.030463813097332, 0.7132847346883695, -0.2625589045716869], [0.9704367948586524, -1.3471809390078553, -1.2252231318599536], [-1.030463813097332, 0.10726541889536229, -0.4488810130790934], [-1.030463813097332, 0.5314789399504674, 0.6379979532141109], [-1.030463813097332, -1.5895886653250582, -0.8215252300939062], [-1.030463813097332, -1.4683848021664567, -0.6662568063377341], [0.9704367948586524, 0.9556924610055725, 0.948534800726455], [0.9704367948586524, 0.4102750767918659, -0.3246662740741557], [-1.030463813097332, 0.6526828031090688, 1.0106421702289239], [-1.030463813097332, 1.743517571536482, 1.538554810999909], [0.9704367948586524, -1.831996391642261, -0.9457399690988438], [0.9704367948586524, 0.10726541889536229, -0.5109883825815621], [-1.030463813097332, 1.6223137083778805, 0.38956847520423565], [0.9704367948586524, -0.1351423074218406, -0.6041494368352653], [-1.030463813097332, 1.4405079136399783, 0.26535373619929803], [-1.030463813097332, -0.8623654863734495, -1.0078473386013127], [0.9704367948586524, 0.9556924610055725, 1.2901253329900335], [0.9704367948586524, -0.37755003373904356, -0.7594178605914375], [-1.030463813097332, 1.5617117767985798, 0.2964074209505324], [0.9704367948586524, -0.19574423900114135, -0.6662568063377341], [0.9704367948586524, -0.3169481021597428, -0.728364175840203], [-1.030463813097332, -0.8017635547941487, -1.0078473386013127], [-1.030463813097332, -1.407782870587156, -0.6973104910889686], [-1.030463813097332, -0.01393844426323917, 0.26535373619929803], [-1.030463813097332, -1.831996391642261, -0.8525789148451407], [-1.030463813097332, 1.016294392584873, 1.0416958549801583], [-1.030463813097332, 1.501109845219279, 1.4453937567462054], [-1.030463813097332, -1.7713944600629603, -0.8215252300939062], [0.9704367948586524, -0.9835693495320509, -0.3246662740741557], [-1.030463813097332, 0.5314789399504674, 0.7311590074678141], [-1.030463813097332, -1.7713944600629603, -0.8215252300939062], [0.9704367948586524, 0.04666348731606156, 0.4206221599554701], [-1.030463813097332, 0.4708770083711667, 0.6379979532141109], [0.9704367948586524, 0.8950905294262718, 1.0416958549801583], [0.9704367948586524, -1.7107925284836596, -0.6352031215864997], [-1.030463813097332, 1.2587021189020762, 1.2280179634875648]];
        var coefficients = [[100000.0, 100000.0, 47835.9263557404, 100000.0, 2580.73065123176, 0.0, -0.0, -100000.0, -2709.204834519932, -6150.708629400166, -0.0, -41556.74354305195, -100000.0, -100000.0, -0.0, -0.0, -100000.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -33163.884335120725, -0.0, -0.0, -0.0, -19033.433096416727, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -28.691807072794305, -0.0, -0.0, -535.5563100859284, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -7947.239844366419, -0.0, -0.0, -794.8356613028049, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -1396.0744501036024, -0.0, -0.0, -0.0, -15.091382391801424, -0.0, -0.0, -20.52248053116061, -0.0, -0.0, -0.0, -548.8156769584061, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0], [20.481335106102367, 100000.0, 0.0, 0.0, 0.0, 52176.83609643131, 100000.0, 0.0, 0.0, 0.0, 209.52119838382495, 56260.963604072465, 0.0, 0.0, -0.0, -0.0, -100000.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -3871.991271448419, -0.0, -0.0, -0.0, -52598.49353100781, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -14.060039159265814, -0.0, -0.0, -0.0, -0.0, -468.44942256512803, -0.0, -0.0, -0.0, -0.0, -78.16254545029194, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -2085.429817231654, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -190.41781420252678, -0.0, -0.0, -0.0, -0.0, -0.0, -230.4357920090014, -0.0, -0.0, -62.29884161631548, -588.6464893353591, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -354.7195353488849, -0.0, -0.0, -0.0, -13.654558983190093, -0.0, -0.0, -0.0], [0.0, 8511.487961525143, 0.0, 0.0, 0.0, -0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2646.1018244063366, 0.0, 0.0, 100000.0, 100000.0, 0.0, 100000.0, 100000.0, 100000.0, 80741.49537003007, 100000.0, 31862.249298022845, 100000.0, 100000.0, 0.0, 54876.7581758362, 81827.86669538461, 100000.0, 0.0, 100000.0, -100000.0, -100000.0, -0.0, -100000.0, -0.0, -100000.0, -35597.84231870038, -0.0, -100000.0, -100000.0, -100000.0, -100000.0, -0.0, -0.0, -100000.0, -100000.0, -100000.0, -0.0, -0.0, -0.0, -0.0, -0.0, -13710.527220573218, -0.0, -100000.0, -0.0, -0.0, -26044.711411752363, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -73905.74604340023, -0.0, -0.0, -0.0, -0.0, -0.0, -100000.0, -0.0, -0.0, -100000.0, -49.5425448474306, -0.0, -0.0, -77.626356182636, -0.0, -0.0, -0.0, -2746.7983712452087, -0.0, -0.0, -0.0, -0.0, -0.0, -1359.3555413012439, -0.0], [0.0, 2206.0014937982087, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 581.5039057292792, 0.0, 0.0, 490.29503143392344, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 100000.0, 0.0, 0.0, 100000.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 100000.0, 0.0, 0.0, 100000.0, 0.0, 86490.83671112426, 0.0, 0.0, 100000.0, 0.0, 0.0, 0.0, 0.0, 71910.19224988064, 100000.0, 0.0, 0.0, 0.0, 100000.0, 74652.39217968524, 100000.0, 100000.0, 100000.0, 518.3639709840492, 100000.0, 0.0, 3109.8344833505257, 100000.0, -0.0, -100000.0, -0.0, -0.0, -0.0, -0.0, -100000.0, -0.0, -0.0, -0.0, -100000.0, -58958.09895126782, -77723.52064375536, -100000.0, -100000.0, -0.0, -100000.0, -100000.0, -100000.0, -100000.0, -100000.0, -0.0, -0.0, -0.0, -0.0, -0.0, -0.0, -19402.388412749446, -0.0, -0.0, -80582.23188049642, -278.2208174827484, -0.0, -0.0, -0.0], [0.0, 569.3381574895667, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 12.615856577263362, 0.0, 0.0, 355.75823775481166, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 4183.780268729089, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 262.8411107284887, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 100000.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.0, 0.0, 0.0, 100000.0, 70409.10600099948, 100000.0, 54936.10022851055, 0.0, 100000.0, 100000.0, 100000.0, 0.0, 0.0, 0.0, 0.0, 0.0, 100000.0, 0.0, 0.0, 0.0, 0.0, 0.0, 100000.0, 100000.0, -77780.63800395251, -100000.0, -65022.156263076955, -100000.0, -100000.0, -28155.893156127117, -100000.0, -93395.53761548533, -100000.0, -60990.9811908684, -0.0, -100000.0]];
        var intercepts = [101.19756596877926, 4.282750364533056, -0.4641421393702855, -0.6457789822067099, -0.09875017740777155, -55.857828463907914, -0.798524030046373, -0.15887847989322373, -0.04359145153326981, 111.28044502043817, 34.651145293207954, -0.9146046989578271, 113.23913598609192, -24.6698401382261, 71.94345555058915];
        var weights = [6, 8, 17, 27, 23, 12];
        var clf = new SVC(6, 6, vectors, coefficients, intercepts, weights, "rbf", 0.001, 0.0, 3);
        mean_= [0.515,170.23,106.455]
        scale_ =[0.4997749494,16.5011242041,32.2022976665]
        x = []
        for(var i = 0;i<=features.length-1;i++)
        x.push((features[i] - mean_[i])/scale_[i]);
        var prediction = clf.predict(x)+1;
        return prediction
}

module.exports = {
    bmiPredict
};
