

// Given a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x.
// You should preserve the original relative order of the nodes in each of the two partitions.



// Input:
// Head of a Linked List and a Number
// Output:
//  Head of a Linked List
// Constraints:
// none (but if your interviewee solves it sub-optimally,  introduce the constraint of  O(1) space and O(n) time.
// Edge cases:
// Linked List is length of 1.

// input: 1 -> 4 -> 3 -> 5,  3
// output: 1 -> 4 -> 3 -> 5

// justify: given a head and number, partition the linked list by this number
// specification: edge constraints: linked list is length of 1
// explanation: the output is the input partitioned by a certain value
// visualization:

// input: 1 -> 6 -> 4 -> 2,  3
// output: 1 -> 2 -> 6 -> 4

// pseudocoding




const partition = (head, x) => { // O(n) time, O(1) space
  if (head.next === null) {
    return head;
  }
  let trailingPointer = null;
  let leadingPointer = head;
  let tailPointer = head;
  let originalLength = 1;
  while (tailPointer.next !== null) {
    tailPointer = tailPointer.next;
    originalLength++;
  }
  for (var i = 0; i < originalLength; i++) {
    if (leadingPointer.val >= x) {
      tailPointer.next = leadingPointer;
      tailPointer = tailPointer.next;
      leadingPointer = leadingPointer.next;
      trailingPointer ? trailingPointer.next = leadingPointer : head = leadingPointer; // If head of list is equal to or larger than target value, move head to next node in list
      tailPointer.next = null;
    } else {
      leadingPointer = leadingPointer.next;
      trailingPointer ? trailingPointer = trailingPointer.next : trailingPointer = head;
    }
  }
  return head;
}




function ListNode(val)  {
  this.val = val;
  this.next = null;
}

var partitionLinkedList = (head, number) => {
  /// edge case if LL is length of 1
  if(!head || !head.next) {
    return head;
  }
  // define variables to use later
  let smallerList = null;
  let biggerList = null;
  let tempHead = head;
  var count = 0;




  let lesserList = null;
  let greaterList = null;
  let linkNode = null;
  let lastNode = null;
  let currNode = head;


while (currNode) {

  if (currNode.val < x) {
    //add to lesserList
    if (!lesserList) {
        lesserList = currNodeCopy;
        linkNode = currNodeCopy;
    } else {
        linkNode.next = currNodeCopy;
        linkNode = currNodeCopy;
    }
} else {
  //add to greaterList
  if (!greaterList) {
      greaterList = currNodeCopy;
      lastNode = currNodeCopy;
  } else {
      lastNode.next = currNodeCopy;
      lastNode = currNodeCopy;
  }
}

currNode = currNode.next;

}

//link both lists together
if (linkNode) {
    linkNode.next = greaterList;
    return lesserList;
} else {
    return greaterList;
}
}





  // iterate through the original list
  while(tempHead) {
      // check if node is less than or greater than in value to the number
     if(tempHead.val < number && smallerList.head) {
       smallerList.next = tempHead;
     } else {
       smallerList = tempHead;
     }
     if(tempHead.val > number && biggerList.head) {
       biggerList.next = tempHead;
    } else {
       biggerList = tempHead;
     }
     tempHead = tempHead.next;
     count++;
  }
  // set the end of the less than linked list to the node before the greater than linked list's head
  // AKA  < LL.tail.next = > LL.head
  //return <LL. head;
  console.log(smallerList);
  smallerList.next = biggerList;
  return smallerList;
}

var node1 = new ListNode(4);
var node2 = new ListNode(6);
var node3 = new ListNode(1);
var node4 = new ListNode(2);
node1.next = node2;
node2.next = node3;
node3.next = node4;
var k = 3;

console.log(partitionLinkedList(node1, k));














