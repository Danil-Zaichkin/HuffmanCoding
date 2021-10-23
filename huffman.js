let inputData = 'abccdddd';
let alph = new Array();
let tree = new Array();
let masOfCodes = new Array();
let i = 0;
let alphLen = 0;
let decodedData = '';

console.log('input data: ' + inputData)

function Node(letter, freq, used, parent, code){
    // this = {}
    this.letter = letter;
    this.freq = freq;
    this.used = used;
    this.parent = parent;
    this.code = code;
    // return this
}

for (i = 0; i < inputData.length; i++)
    alph[inputData.charAt(i)] = 0;

for (i = 0; i < inputData.length; i++)
    alph[inputData.charAt(i)]++;

for (i in alph) {
    let n = new Node(i, alph[i], false, null, '');
    tree.push(n);
    alphLen++;
}

let tmp = 0;
while (tree[tree.length - 1].freq !== inputData.length) {
    let min1 = inputData.length+1, min2 = inputData.length+1;
    let minIndex1 = 0, minIndex2 = 0;
    for (let i = 0; i < tree.length; i++) {
        if (tree[i].freq < min1 && tree[i].used === false) {
            min2 = min1
            min1 = tree[i].freq
            minIndex2 = minIndex1
            minIndex1 = i
        } else if (tree[i].freq < min2 && tree[i].used === false) {
            min2 = tree[i].freq;
            minIndex2 = i;
        }
    }
    let n = new Node(tree[minIndex1].letter + tree[minIndex2].letter,
                    tree[minIndex1].freq + tree[minIndex2].freq,
                    false,
                    null,
                    '');
    tree.push(n);
    tree[minIndex1].used = true;
    tree[minIndex2].used = true;
    tree[minIndex1].parent = tree.length - 1
    tree[minIndex2].parent = tree.length - 1
    tmp++
}

let n = 0
let currentCode = 0
for (i = 0; i < tmp; i++) {
    for (let j = 0; j < tree.length; j++) {
        if (tree[j].parent === tree.length - i - 1){
            currentCode = n % 2
            tree[j].code += tree[tree[j].parent].code + currentCode.toString()
            n++
        }

    }
}

for (i = 0; i < alphLen; i++)
    masOfCodes[tree[i].letter] = tree[i].code;

let codedData = new Array();
for (i in inputData)
    codedData[i] = masOfCodes[inputData.charAt(i)]

console.log('coded dada: ' + codedData)

for (i in codedData){
    for (let j = 0; j < tree.length; j++) {
        if (tree[j].code === codedData[i])
            decodedData += tree[j].letter
    }
}

console.log('decoded data: ' + decodedData)