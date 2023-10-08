// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFT is ERC721URIStorage {

    struct Collection {
        string uri;
        string location;
        address owner;
        string proof;
    }

    uint256 private _nextTokenId;
    string[] public locations;
    Collection[] public collections;
    mapping(uint256 => string) public lat_long;

    constructor() ERC721("MyNFT", "NFT") {}

    function mintNFT(
        string memory tokenURI,
        string memory location,
        string memory proof
    ) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;

        uint256 newItemId = tokenId;
        lat_long[newItemId] = location;
        collections.push(Collection(tokenURI, location, msg.sender, proof));
        locations.push(location);
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function getCollection() public view returns (Collection[] memory) {
        return collections;
    }

    function getLocation(uint256 tokenId) public view returns (string memory) {
        return lat_long[tokenId];
    }

    function getLocations() public view returns (string[] memory) {
        return locations;
    }

}
