var roleHarvester = {


    getNextSource: function(creep) {
        
        var nextSourceId = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE, {
            filter: function(source) {
                return Memory.sources[source.id] < 3;
            }
        }).id;
 
        Memory.sources[nextSourceId] += 1;
        
        creep.memory.sourceToHarvest = nextSourceId;
    },

    releaseSource: function(creep) { 
        
        var idToRelease = creep.memory.sourceToHarvest;

        if (idToRelease != undefined && idToRelease != null) {
            Memory.sources[idToRelease] -= 1;
        }

        creep.memory.sourceToHarvest = null;
    },

    /** @param {Creep} creep **/
    run: function(creep) {    



	    if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            sources = _.sortBy(sources, s => creep.pos.getRangeTo(s));

            if (creep.memory.sourceToHarvest == null || creep.memory.sourceToHarvest == undefined) {
                this.getNextSource(creep);
            }
            if (creep.memory.sourceToHarvest == null) {
                creep.moveTo(Game.flags['wait']);
            }
            else if (creep.harvest(Game.getObjectById(creep.memory.sourceToHarvest)) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.sourceToHarvest), {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            if (creep.memory.sourceToHarvest != null) {
                this.releaseSource(creep);
            }

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