var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            sources = _.sortBy(sources, s => creep.pos.getRangeTo(s));
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                if (OK != creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}})) {
                    creep.moveTo(Game.flags['harvest queue']);
                }
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                targets = _.sortBy(targets, t => creep.pos.getRangeTo(t));
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                creep.moveTo(Game.flags['wait']);
            }
        }
	}
};

module.exports = roleHarvester;