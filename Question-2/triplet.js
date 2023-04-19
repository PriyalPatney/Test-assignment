function countTriplets(arr) {
    const n = arr.length;
    let count = 0;
  
    // Sort the array to make it easier to find triplets
    arr.sort((a, b) => a - b);
  
    // Iterate over each element in the array
    for (let i = 0; i < n - 2; i++) {
      // Use two pointers to find the other two elements
      let left = i + 1;
      let right = n - 1;
  
      while (left < right) {
        const sum = arr[i] + arr[left] + arr[right];
  
        // If the sum is zero, we have found a triplet
        if (sum === 0) {
          count++;
  
          // Move the pointers to find more triplets
          left++;
          right--;
        } else if (sum < 0) {
          // If the sum is negative, we need to increase the sum by moving the left pointer
          left++;
        } else {
          // If the sum is positive, we need to decrease the sum by moving the right pointer
          right--;
        }
      }
    }
  
    // Return the number of triplets found
    return count;
  }
  
  // Example usage
  const arr = [0, -1, 2, -3, 1];
  const result = countTriplets(arr);
  console.log(result); // Output: 2
  