var spawning = {
    run : function() {
        var harvs = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var ups = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var builds = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');


        for(var i in Memory.creeps) {
            if(!Game.creeps[i]) {
                delete Memory.creeps[i];
            }
        }
        
        if (!Game.spawns['Spawn1'].spawning) {
            if (harvs.length < 6) {
                var newName = 'Harvester' + Game.time;
                
                if (Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'harvester', sourceToHarvest: null}}) == OK) {
                    
                }
            }

            else if (builds.length < 2) {
                var newName = 'Builder' + Game.time;
                
                if (Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'builder'}}) == OK) {
                    
                }
            }

            else if (ups.length < 2) {
                var newName = 'Upgrader' + Game.time;
                
                
                if (Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'upgrader'}}) == OK) {
                    
                }
            }
        }
    }
}

module.exports = spawning;