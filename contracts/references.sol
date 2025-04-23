// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title TrustDavisReferenceDB
 * @dev Reference database for Trust Davis system to track insurers, liabilities, and fees
 */
contract TrustDavisReferenceDB {
    // Constants
    address private constant FACTORY = address(0x10);
    uint256 private constant INSURED_OFFSET = 2 ** 160;
    
    // Record structure indices
    uint256 private constant R_MAX_LIABILITY = 0;
    uint256 private constant R_LOCKED = 1;
    uint256 private constant R_PREMIUM = 2;
    uint256 private constant R_LAST_UPDATED = 3;
    uint256 private constant RECORD_SIZE = 4;
    
    // Error codes
    uint256 private constant E_INVALID_CMD = 900;
    uint256 private constant E_INVALID_INSURED_ADDRESS = 901;
    uint256 private constant E_INVALID_INSURER_ADDRESS = 902;
    uint256 private constant E_INVALID_AMOUNT = 903;
    uint256 private constant E_RECORD_NOT_FOUND = 910;
    uint256 private constant E_PREMIUM_MISMATCH = 920;
    uint256 private constant E_NO_AVAILABLE_LIABILITY_FOR_INSURED = 921;
    uint256 private constant E_NO_AVAILABLE_LIABILITY_FOR_INSURER = 922;
    uint256 private constant E_NOT_IMPLEMENTED = 999;
    
    // Storage mapping to match the original contract's storage layout
    mapping(uint256 => uint256) private contractStorage;
    
    // Events
    event Deposit(address indexed insurer, uint256 amount);
    event Withdrawal(address indexed insurer, uint256 amount);
    event ReferenceSet(address indexed insurer, address indexed insured, uint256 maxLiability, uint256 premium);
    event ReferenceLocked(address indexed insurer, address indexed insured, uint256 liability, uint256 premium);
    event ReferenceReleased(address indexed insurer, address indexed insured, uint256 liability, bool success);
    
    /**
     * @dev Constructor sets the factory address
     */
    constructor() {
        contractStorage[uint256(uint160(FACTORY))] = uint256(uint160(msg.sender));
    }
    
    /**
     * @dev Modifier to check if sender is the factory
     */
    modifier onlyFactory() {
        require(msg.sender == address(uint160(contractStorage[uint256(uint160(FACTORY))])), "Only factory can call this function");
        _;
    }
    
    /**
     * @dev Self-destructs the contract, sending funds to the factory
     */
    function suicide() external onlyFactory {
        selfdestruct(payable(msg.sender));
    }
    
    /**
     * @dev Allows an insurer to deposit funds to increase their max liability
     */
    function deposit() external payable returns (uint256) {
        require(msg.value > 0, "Must deposit something");
        
        uint256 insurerKey = uint256(uint160(msg.sender)) + R_MAX_LIABILITY;
        contractStorage[insurerKey] += msg.value;
        
        emit Deposit(msg.sender, msg.value);
        return 1;
    }
    
    /**
     * @dev Allows an insurer to withdraw available funds
     * @param amount The amount to withdraw
     * @return Error code or success (1)
     */
    function withdraw(uint256 amount) external returns (uint256) {
        if (amount == 0) {
            return E_INVALID_AMOUNT;
        }
        
        uint256 insurerMaxLiability = contractStorage[uint256(uint160(msg.sender)) + R_MAX_LIABILITY];
        uint256 insurerLocked = contractStorage[uint256(uint160(msg.sender)) + R_LOCKED];
        
        if (amount > insurerMaxLiability - insurerLocked) {
            return E_NO_AVAILABLE_LIABILITY_FOR_INSURER;
        }
        
        contractStorage[uint256(uint160(msg.sender)) + R_MAX_LIABILITY] -= amount;
        
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        
        emit Withdrawal(msg.sender, amount);
        return 1;
    }
    
    /**
     * @dev Sets a reference for an insured party
     * @param insured The insured address
     * @param maxLiability The maximum liability amount
     * @param premium The premium amount
     * @return Error code or success (1)
     */
    function set(address insured, uint256 maxLiability, uint256 premium) external returns (uint256) {
        if (insured == address(0) || uint256(uint160(insured)) >= 2**160) {
            return E_INVALID_INSURED_ADDRESS;
        }
        
        uint256 insuredIdx = uint256(uint160(msg.sender)) * INSURED_OFFSET + uint256(uint160(insured)) * RECORD_SIZE;
        
        contractStorage[insuredIdx + R_MAX_LIABILITY] = maxLiability;
        contractStorage[insuredIdx + R_PREMIUM] = premium;
        contractStorage[insuredIdx + R_LAST_UPDATED] = block.timestamp;
        
        // TODO: Add list of references as mentioned in the original code
        
        emit ReferenceSet(msg.sender, insured, maxLiability, premium);
        return 1;
    }
    
    /**
     * @dev Locks a portion of liability for an insured party
     * @param insured The insured address
     * @param liability The liability amount to lock
     * @param premium The premium amount (must match the set premium)
     * @return Error code or success (1)
     */
    function lock(address insured, uint256 liability, uint256 premium) external returns (uint256) {
        if (insured == address(0) || uint256(uint160(insured)) >= 2**160) {
            return E_INVALID_INSURED_ADDRESS;
        }
        
        uint256 insuredIdx = uint256(uint160(msg.sender)) * INSURED_OFFSET + uint256(uint160(insured)) * RECORD_SIZE;
        
        if (contractStorage[insuredIdx + R_LAST_UPDATED] ==.0) {
            return E_RECORD_NOT_FOUND;
        }
        
        if (premium != contractStorage[insuredIdx + R_PREMIUM]) {
            return E_PREMIUM_MISMATCH;
        }
        
        // TODO: Charge premium as mentioned in the original code
        
        uint256 insuredMaxLiability = contractStorage[insuredIdx + R_MAX_LIABILITY];
        uint256 insuredLocked = contractStorage[insuredIdx + R_LOCKED];
        
        if (liability > insuredMaxLiability - insuredLocked) {
            return E_NO_AVAILABLE_LIABILITY_FOR_INSURED;
        }
        
        uint256 insurerMaxLiability = contractStorage[uint256(uint160(msg.sender)) + R_MAX_LIABILITY];
        uint256 insurerLocked = contractStorage[uint256(uint160(msg.sender)) + R_LOCKED];
        
        if (liability > insurerMaxLiability - insurerLocked) {
            return E_NO_AVAILABLE_LIABILITY_FOR_INSURER;
        }
        
        contractStorage[insuredIdx + R_LOCKED] += liability;
        contractStorage[uint256(uint160(msg.sender)) + R_LOCKED] += liability;
        
        emit ReferenceLocked(msg.sender, insured, liability, premium);
        return 1;
    }
    
    /**
     * @dev Releases locked liability for an insured party
     * @param insured The insured address
     * @param liability The liability amount to release
     * @param success Whether the transaction was successful (0 = claim, 1 = success)
     * @return Error code or success (1)
     */
    function release(address insured, uint256 liability, uint256 success) external returns (uint256) {
        if (insured == address(0) || uint256(uint160(insured)) >= 2**160) {
            return E_INVALID_INSURED_ADDRESS;
        }
        
        uint256 insuredIdx = uint256(uint160(msg.sender)) * INSURED_OFFSET + uint256(uint160(insured)) * RECORD_SIZE;
        
        if (contractStorage[insuredIdx + R_LAST_UPDATED] == 0) {
            return E_RECORD_NOT_FOUND;
        }
        
        contractStorage[insuredIdx + R_LOCKED] -= liability;
        contractStorage[uint256(uint160(msg.sender)) + R_LOCKED] -= liability;
        
        bool isSuccess = success != 0;
        
        if (!isSuccess) {
            contractStorage[insuredIdx + R_MAX_LIABILITY] -= liability;
            contractStorage[uint256(uint160(msg.sender)) + R_MAX_LIABILITY] -= liability;
            
            // TODO: Pay to insured/claimant as mentioned in the original code
        }
        
        emit ReferenceReleased(msg.sender, insured, liability, isSuccess);
        return 1;
    }
    
    /**
     * @dev Fallback function to handle command-based calls with proper error handling
     */
    fallback() external payable {
        revert("Invalid command");
    }
    
    /**
     * @dev Get the record for an insured party
     * @param insurer The insurer address
     * @param insured The insured address
     * @return maxLiability, locked, premium, lastUpdated
     */
    function getRecord(address insurer, address insured) external view returns (
        uint256 maxLiability,
        uint256 locked,
        uint256 premium,
        uint256 lastUpdated
    ) {
        uint256 insuredIdx = uint256(uint160(insurer)) * INSURED_OFFSET + uint256(uint160(insured)) * RECORD_SIZE;
        
        return (
            contractStorage[insuredIdx + R_MAX_LIABILITY],
            contractStorage[insuredIdx + R_LOCKED],
            contractStorage[insuredIdx + R_PREMIUM],
            contractStorage[insuredIdx + R_LAST_UPDATED]
        );
    }
    
    /**
     * @dev Get insurer's overall liability status
     * @param insurer The insurer address
     * @return maxLiability, locked
     */
    function getInsurerStatus(address insurer) external view returns (
        uint256 maxLiability,
        uint256 locked
    ) {
        return (
            contractStorage[uint256(uint160(insurer)) + R_MAX_LIABILITY],
            contractStorage[uint256(uint160(insurer)) + R_LOCKED]
        );
    }
}
