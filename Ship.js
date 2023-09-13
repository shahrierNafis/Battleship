/**
 * Creates a ship object with a given length.
 * @param {number} length - The length of the ship.
 * @returns {Object} - The ship object.
 */
function create(length) {
    let hits = 0;

    /**
     * Increments the hit counter if the ship is not yet sunk.
     */
    function hit() {
        if (!isSunk()) {
            hits++;
        }
    }

    /**
     * Checks if the ship is sunk.
     * @returns {boolean} - True if the ship is sunk, false otherwise.
     */
    function isSunk() {
        return hits === length;
    }

    return {
        /**
         * Gets the length of the ship.
         * @returns {number} - The length of the ship.
         */
        get length() {
            return length;
        },
        get hits() {
            return hits;
        },
        hit,
        isSunk,
    };
}
export default { create }