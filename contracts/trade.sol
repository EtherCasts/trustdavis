// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title TrustDavis
 * @dev Trade escrow contract with insurance mechanisms
 */
contract TrustDavis {
    // Constants for storage slots
    uint256 private constant CREATOR = 1000;
    uint256 private constant BUYER = 1001;
    uint256 private constant SELLER = 1002;
    uint256 private constant REGISTRY = 1003;
    uint256 private constant AMOUNT = 2000;
    uint256 private constant CREATED = 2001;
    uint256 private constant EXPIRY = 2002;
    uint256 private constant STATE = 2003;
    uint256 private constant INSURED_BUYER = 3000;
    uint256 private constant INSURED_SELLER = 3000;
    uint256 private constant INSURER_LIST = 4000;
    
    // Storage mapping to mimic the original contract
    mapping(uint256 => uint256) private numericStorage;
    mapping(uint256 => address) private addressStorage;
    mapping(uint256 => string) private stringStorage;
    
    // State values
    string private constant STATE_NEW = "new";
    string private constant STATE_FILLING = "filling";
    string private constant STATE_WAITING = "waiting";
    string private constant STATE_COMPLETED_BUYER = "completed_buyer";
    string private constant STATE_COMPLETED_SELLER = "completed_seller";
    string private constant STATE_COMPLETED = "completed";
    string private constant STATE_FAILED = "failed";
    string private constant STATE_EXPIRED = "expired";
    string private constant STATE_CANCELLED = "cancelled";
    
    // Events
    event StateChanged(string oldState, string newState);
    event ContractCreated(address buyer, address seller, uint256 amount, uint256 expiry);
    
    /**
     * @dev Constructor initializes the contract with the creator and timestamp
     */
    constructor() {
        addressStorage[CREATOR] = msg.sender;
        numericStorage[CREATED] = block.timestamp;
        stringStorage[STATE] = STATE_NEW;
    }
    
    /**
     * @dev Modifier to check if sender is the creator
     */
    modifier onlyCreator() {
        require(msg.sender == addressStorage[CREATOR], "Only creator can call this function");
        _;
    }
    
    /**
     * @dev Modifier to check if the contract is in a specific state
     */
    modifier inState(string memory _state) {
        require(keccak256(abi.encodePacked(stringStorage[STATE])) == keccak256(abi.encodePacked(_state)), 
                "Contract not in required state");
        _;
    }
    
    /**
     * @dev Modifier to check if the contract has expired
     */
    modifier notExpired() {
        if (block.timestamp >= numericStorage[EXPIRY] && 
            keccak256(abi.encodePacked(stringStorage[STATE])) != keccak256(abi.encodePacked(STATE_EXPIRED))) {
            stringStorage[STATE] = STATE_EXPIRED;
            emit StateChanged(stringStorage[STATE], STATE_EXPIRED);
        }
        _;
    }
    
    /**
     * @dev Function to destroy the contract and return funds to creator
     */
    function suicide() public onlyCreator inState(STATE_NEW) {
        selfdestruct(payable(addressStorage[CREATOR]));
    }
    
    /**
     * @dev Creates the trade contract with buyer, seller, registry, amount, and expiry
     */
    function create(
        address _buyer, 
        address _seller, 
        address _registry, 
        uint256 _amount, 
        uint256 _expiry
    ) public onlyCreator inState(STATE_NEW) {
        addressStorage[BUYER] = _buyer;
        addressStorage[SELLER] = _seller;
        addressStorage[REGISTRY] = _registry;
        numericStorage[AMOUNT] = _amount;
        numericStorage[EXPIRY] = _expiry;
        
        string memory oldState = stringStorage[STATE];
        stringStorage[STATE] = STATE_FILLING;
        
        emit StateChanged(oldState, STATE_FILLING);
        emit ContractCreated(_buyer, _seller, _amount, _expiry);
    }
    
    /**
     * @dev Handles expiration state transition
     */
    function checkExpiry() public notExpired returns (bool) {
        return block.timestamp < numericStorage[EXPIRY];
    }
    
    /**
     * @dev Allows buyer to fund the escrow
     */
    function fundEscrow() public payable notExpired inState(STATE_FILLING) {
        require(msg.sender == addressStorage[BUYER], "Only buyer can fund escrow");
        require(msg.value == numericStorage[AMOUNT], "Incorrect amount sent");
        
        // Transition to waiting state once funded
        string memory oldState = stringStorage[STATE];
        stringStorage[STATE] = STATE_WAITING;
        emit StateChanged(oldState, STATE_WAITING);
    }
    
    /**
     * @dev Allows buyer or seller to add insurers (placeholder, needs expansion)
     */
    function addInsurer(address insurer, uint256 amount, uint256 fee) public notExpired {
        require(
            msg.sender == addressStorage[BUYER] || msg.sender == addressStorage[SELLER],
            "Only buyer or seller can add insurers"
        );
        
        // TODO: Implement insurer logic
        // This is a placeholder for the insurer functionality
    }
    
    /**
     * @dev Allows buyer or seller to cancel the contract in filling state
     */
    function cancel() public notExpired inState(STATE_FILLING) {
        require(
            msg.sender == addressStorage[BUYER] || msg.sender == addressStorage[SELLER],
            "Only buyer or seller can cancel"
        );
        
        string memory oldState = stringStorage[STATE];
        stringStorage[STATE] = STATE_CANCELLED;
        emit StateChanged(oldState, STATE_CANCELLED);
        
        // Return any funds to buyer if contract is cancelled
        if (address(this).balance > 0) {
            payable(addressStorage[BUYER]).transfer(address(this).balance);
        }
    }
    
    /**
     * @dev Buyer confirms completion of the trade
     */
    function completeByBuyer() public notExpired inState(STATE_WAITING) {
        require(msg.sender == addressStorage[BUYER], "Only buyer can confirm completion");
        
        string memory oldState = stringStorage[STATE];
        stringStorage[STATE] = STATE_COMPLETED_BUYER;
        emit StateChanged(oldState, STATE_COMPLETED_BUYER);
        
        // Check if seller has already completed
        if (keccak256(abi.encodePacked(STATE_COMPLETED_SELLER)) == keccak256(abi.encodePacked(oldState))) {
            finalizeCompletion();
        }
    }
    
    /**
     * @dev Seller confirms completion of the trade
     */
    function completeBySeller() public notExpired inState(STATE_WAITING) {
        require(msg.sender == addressStorage[SELLER], "Only seller can confirm completion");
        
        string memory oldState = stringStorage[STATE];
        stringStorage[STATE] = STATE_COMPLETED_SELLER;
        emit StateChanged(oldState, STATE_COMPLETED_SELLER);
        
        // Check if buyer has already completed
        if (keccak256(abi.encodePacked(STATE_COMPLETED_BUYER)) == keccak256(abi.encodePacked(oldState))) {
            finalizeCompletion();
        }
    }
    
    /**
     * @dev Internal function to finalize completion when both parties agree
     */
    function finalizeCompletion() private {
        string memory oldState = stringStorage[STATE];
        stringStorage[STATE] = STATE_COMPLETED;
        emit StateChanged(oldState, STATE_COMPLETED);
        
        // Transfer funds to seller
        payable(addressStorage[SELLER]).transfer(address(this).balance);
    }
    
    /**
     * @dev Either buyer or seller can mark the trade as failed
     */
    function fail() public notExpired inState(STATE_WAITING) {
        require(
            msg.sender == addressStorage[BUYER] || msg.sender == addressStorage[SELLER],
            "Only buyer or seller can mark as failed"
        );
        
        string memory oldState = stringStorage[STATE];
        stringStorage[STATE] = STATE_FAILED;
        emit StateChanged(oldState, STATE_FAILED);
        
        // Return funds to buyer on failure
        payable(addressStorage[BUYER]).transfer(address(this).balance);
        
        // TODO: Handle insurance claims
    }
    
    /**
     * @dev Handle expiration, returning funds to the buyer
     */
    function handleExpiry() public {
        require(block.timestamp >= numericStorage[EXPIRY], "Contract not expired yet");
        require(
            keccak256(abi.encodePacked(stringStorage[STATE])) != keccak256(abi.encodePacked(STATE_EXPIRED)) &&
            keccak256(abi.encodePacked(stringStorage[STATE])) != keccak256(abi.encodePacked(STATE_COMPLETED)) &&
            keccak256(abi.encodePacked(stringStorage[STATE])) != keccak256(abi.encodePacked(STATE_FAILED)) &&
            keccak256(abi.encodePacked(stringStorage[STATE])) != keccak256(abi.encodePacked(STATE_CANCELLED)),
            "Contract already in final state"
        );
        
        string memory oldState = stringStorage[STATE];
        stringStorage[STATE] = STATE_EXPIRED;
        emit StateChanged(oldState, STATE_EXPIRED);
        
        // Return funds to buyer on expiration
        payable(addressStorage[BUYER]).transfer(address(this).balance);
    }
    
    /**
     * @dev Get contract information
     */
    function getContractInfo() public view returns (
        address creator,
        address buyer, 
        address seller, 
        uint256 amount,
        uint256 created,
        uint256 expiry,
        string memory state
    ) {
        return (
            addressStorage[CREATOR],
            addressStorage[BUYER],
            addressStorage[SELLER],
            numericStorage[AMOUNT],
            numericStorage[CREATED],
            numericStorage[EXPIRY],
            stringStorage[STATE]
        );
    }
}
