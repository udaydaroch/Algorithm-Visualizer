document.addEventListener("DOMContentLoaded", function() {
    const selectedAlgorithms = new Set();

    const manualInputOption = document.getElementById("manual-input");
    const autoGenerateOption = document.getElementById("auto-generate");
    const inputValuesField = document.getElementById("input-values");
   
    const generateRandomValuesButton = document.getElementById("generate-random-values");
    const randomValuesNumberSelect = document.getElementById("random-values-number");

    manualInputOption.checked = true;
    inputValuesField.disabled = false;
    generateRandomValuesButton.disabled = true;
    randomValuesNumberSelect.disabled = true;

    manualInputOption.addEventListener("change", function() {
        inputValuesField.disabled = !this.checked;
        generateRandomValuesButton.disabled = this.checked;
        randomValuesNumberSelect.disabled = this.checked;
    });

    autoGenerateOption.addEventListener("change", function() {
        inputValuesField.disabled = this.checked;
        generateRandomValuesButton.disabled = !this.checked;
        randomValuesNumberSelect.disabled = !this.checked;
    });

    const algorithmSelect = document.getElementById("algorithm-select");
    const addAlgorithmButton = document.getElementById("add-algorithm");
    const algorithmList = document.getElementById("algorithm-list");

    addAlgorithmButton.addEventListener("click", function() {
        const selectedAlgorithm = algorithmSelect.value;
        if (!selectedAlgorithms.has(selectedAlgorithm)) {
            selectedAlgorithms.add(selectedAlgorithm);
            updateDropdownOptions();
            renderAlgorithmList(selectedAlgorithm);
        }
    });

    generateRandomValuesButton.addEventListener("click", function() {
        const randomValuesNumber = parseInt(randomValuesNumberSelect.value);
        const randomValues = Array.from({ length: randomValuesNumber }, () => Math.floor(Math.random() * 100));
        inputValuesField.value = randomValues.join(", ");
    });

    function updateDropdownOptions() {
        const selectedOptions = Array.from(selectedAlgorithms);
        let selectedIndex = 0;
        let allOptionsDisabled = true;
        for (let i = algorithmSelect.options.length - 1; i >= 0; i--) {
            const option = algorithmSelect.options[i];
            if (!selectedOptions.includes(option.value)) {
                selectedIndex = i;
                option.disabled = false;
                allOptionsDisabled = false;
            } else {
                option.disabled = true;
            }
        }
        algorithmSelect.selectedIndex = selectedIndex;

        addAlgorithmButton.disabled = allOptionsDisabled;
    }

    function renderAlgorithmList(algorithm) {
        const cardWrapper = document.createElement("div");
        cardWrapper.classList.add("card", "mb-2", "d-inline-block");
        const listItem = document.createElement("div");
        listItem.classList.add("card-body");
        listItem.innerHTML = `
            <span> ${algorithm} </span>
            <button class="btn btn-danger btn-sm ms-2" data-algorithm="${algorithm}">Remove</button>
        `;
        cardWrapper.appendChild(listItem);
        algorithmList.appendChild(cardWrapper);

        listItem.querySelector("button").addEventListener("click", function() {
            const algorithmToRemove = this.getAttribute("data-algorithm");
            selectedAlgorithms.delete(algorithmToRemove);
            updateDropdownOptions();
            algorithmList.removeChild(cardWrapper);
        });
    }
    const visualizeButton = document.getElementById("visualize");

    // Add the event listener for the "Visualize" button
    visualizeButton.addEventListener("click", visualizeButtonClickHandler);
    

    function visualizeButtonClickHandler() {
        const values = inputValuesField.value.split(",").map(value => parseInt(value.trim()));
       
        const visualizationContainer = document.getElementById("visualization-container");
        visualizationContainer.innerHTML = ""; // Clear the visualization container
    
        // Visualize the selected algorithms again
        selectedAlgorithms.forEach(function(algorithm) {
            switch(algorithm) {
                case "selection":
                    visualizeSorting(selectionSortSteps(values.slice()), "Selection Sort");
                    break;
                case "bubble":
                    visualizeSorting(bubbleSortSteps(values.slice()), "Bubble Sort");
                    break;
                case "insertion":
                    visualizeSorting(insertionSortSteps(values.slice()), "Insertion Sort");
                    break;
                case "merge":
                    visualizeSorting(mergeSortSteps(values.slice()), "Merge Sort");
                    break;
                case "quick":
                    visualizeSorting(quickSortSteps(values.slice()), "Quick Sort");
                    break;
                case "heap":
                    visualizeSorting(heapSortSteps(values.slice()), "Heap Sort");
                    break;
                case "counting":
                    visualizeSorting(countingSortSteps(values.slice()), "Counting Sort");
                    break;
                case "radix":
                    visualizeSorting(radixSortSteps(values.slice()), "Radix Sort");
                    break;
                default:
                    // Handle unsupported algorithms
                    break;
            }
        });
    }
    
    
    function visualizeSorting(steps, algorithmName) {
        const visualizationContainer = document.getElementById("visualization-container");
        
        // Create container for the algorithm visualization card
        const algorithmCard = document.createElement("div");
        algorithmCard.classList.add("card", "mb-3");
        
        // Create card header for the algorithm name
        const cardHeader = document.createElement("div");
        cardHeader.classList.add("card-header");
        cardHeader.textContent = algorithmName;
        algorithmCard.appendChild(cardHeader);
        
        // Create card body for the bars representing numbers
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body", "bars-container");
        algorithmCard.appendChild(cardBody);
    
        // Append the card to the visualization container
        visualizationContainer.appendChild(algorithmCard);
    
        let stepIndex = 0;
    
        function nextStep() {
            if (stepIndex < steps.length) {
                const currentStep = steps[stepIndex];
                cardBody.innerHTML = ""; // Clear previous bars
                currentStep.forEach(value => {
                    const barDiv = document.createElement("div");
                    barDiv.classList.add("bar");
                    barDiv.style.height = `${value * 2.4}px`;
                    cardBody.appendChild(barDiv);
                });
                stepIndex++;
                setTimeout(nextStep, 100); // Adjust delay as needed
            }
        }
    
        nextStep();
    }
    
    
    
    function selectionSortSteps(arr) {
        // Selection Sort
        const steps = [];
        let n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            let temp = arr[minIndex];
            arr[minIndex] = arr[i];
            arr[i] = temp;
            steps.push([...arr]); // Store the state of the array after each step
        }
        return steps;
    }

    function bubbleSortSteps(arr) {
        // Bubble Sort
        const steps = [];
        let n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap arr[j] and arr[j + 1]
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    steps.push([...arr]); // Store the state of the array after each step
                }
            }
        }
        return steps;
    }

    function insertionSortSteps(arr) {
        // Insertion Sort
        const steps = [];
        let n = arr.length;
        for (let i = 1; i < n; i++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
            steps.push([...arr]); // Store the state of the array after each step
        }
        return steps;
    }

    function mergeSortSteps(arr) {
        // Merge Sort
        const steps = [];

        // Merge two subarrays of arr[]
        function merge(arr, l, m, r) {
            let n1 = m - l + 1;
            let n2 = r - m;
        
            // Create temp arrays
            let L = new Array(n1);
            let R = new Array(n2);
        
            // Copy data to temp arrays L[] and R[]
            for (let i = 0; i < n1; ++i)
                L[i] = arr[l + i];
            for (let j = 0; j < n2; ++j)
                R[j] = arr[m + 1 + j];
        
            // Merge the temp arrays back into arr[l..r]
        
            // Initial index of first subarray
            let i = 0;
        
            // Initial index of second subarray
            let j = 0;
        
            // Initial index of merged subarray
            let k = l;
        
            while (i < n1 && j < n2) {
                if (L[i] <= R[j]) {
                    arr[k] = L[i];
                    i++;
                } else {
                    arr[k] = R[j];
                    j++;
                }
                k++;
            }
        
            // Copy the remaining elements of L[], if there are any
            while (i < n1) {
                arr[k] = L[i];
                i++;
                k++;
            }
        
            // Copy the remaining elements of R[], if there are any
            while (j < n2) {
                arr[k] = R[j];
                j++;
                k++;
            }
            steps.push([...arr]); // Store the state of the array after each step
        }
        
        // Main function that sorts arr[l..r] using merge()
        function mergeSort(arr, l, r) {
            if (l >= r) {
                return; // Returns recursively
            }
            let m = l + Math.floor((r - l) / 2);
            mergeSort(arr, l, m);
            mergeSort(arr, m + 1, r);
            merge(arr, l, m, r);
        }
        
        mergeSort(arr, 0, arr.length - 1);
        return steps;
    }

    function quickSortSteps(arr) {
        // Quick Sort
        const steps = [];

        function partition(arr, low, high) {
            let pivot = arr[high];
            let i = low - 1;
            for (let j = low; j < high; j++) {
                if (arr[j] < pivot) {
                    i++;
                    let temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                    steps.push([...arr]); // Store the state of the array after each step
                }
            }
            let temp = arr[i + 1];
            arr[i + 1] = arr[high];
            arr[high] = temp;
            steps.push([...arr]); // Store the state of the array after each step
            return i + 1;
        }

        function quickSort(arr, low, high) {
            if (low < high) {
                let pi = partition(arr, low, high);
                quickSort(arr, low, pi - 1);
                quickSort(arr, pi + 1, high);
            }
        }

        quickSort(arr, 0, arr.length - 1);
        return steps;
    }

    function heapSortSteps(arr) {
        // Heap Sort
        const steps = [];

        function heapify(arr, n, i) {
            let largest = i; // Initialize largest as root
            let l = 2 * i + 1; // left = 2*i + 1
            let r = 2 * i + 2; // right = 2*i + 2
        
            // If left child is larger than root
            if (l < n && arr[l] > arr[largest])
                largest = l;
        
            // If right child is larger than largest so far
            if (r < n && arr[r] > arr[largest])
                largest = r;
        
            // If largest is not root
            if (largest != i) {
                let swap = arr[i];
                arr[i] = arr[largest];
                arr[largest] = swap;
                steps.push([...arr]); // Store the state of the array after each step
        
                // Recursively heapify the affected sub-tree
                heapify(arr, n, largest);
            }
        }

        function heapSort(arr) {
            let n = arr.length;
        
            // Build heap (rearrange array)
            for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
                heapify(arr, n, i);
        
            // One by one extract an element from heap
            for (let i = n - 1; i > 0; i--) {
                // Move current root to end
                let temp = arr[0];
                arr[0] = arr[i];
                arr[i] = temp;
                steps.push([...arr]); // Store the state of the array after each step
        
                // call max heapify on the reduced heap
                heapify(arr, i, 0);
            }
        }

        heapSort(arr);
        return steps;
    }

    function countingSortSteps(arr) {
        // Counting Sort
        const steps = [];
        const max = Math.max(...arr);
        const min = Math.min(...arr);
        const range = max - min + 1;
        const count = new Array(range).fill(0);
        const output = new Array(arr.length);

        for (let i = 0; i < arr.length; i++) {
            count[arr[i] - min]++;
        }

        for (let i = 1; i < range; i++) {
            count[i] += count[i - 1];
        }

        for (let i = arr.length - 1; i >= 0; i--) {
            output[count[arr[i] - min] - 1] = arr[i];
            count[arr[i] - min]--;
            steps.push([...output]); // Store the state of the array after each step
        }

        for (let i = 0; i < arr.length; i++) {
            arr[i] = output[i];
        }

        return steps;
    }

    function radixSortSteps(arr) {
        // Radix Sort
        const steps = [];
        const max = Math.max(...arr);
        const digitCount = max.toString().length;
    
        for (let i = 0; i < digitCount; i++) {
            let buckets = Array.from({ length: 10 }, () => []);
            for (let j = 0; j < arr.length; j++) {
                let digit = Math.floor(arr[j] / Math.pow(10, i)) % 10;
                buckets[digit].push(arr[j]);
            }
            arr = buckets.flat();
            steps.push([...arr]); // Store the state of the array after each step
        }
    
        return steps;
    }
    
});
