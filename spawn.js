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
            if (harvs.length < 4) {
                var newName = 'Harvester' + Game.time;
                
                if (Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'harvester'}}) == OK) {
                    console.log("Spawning " + newName);
                }
            }

            else if (ups.length < 2) {
                var newName = 'Upgrader' + Game.time;
                console.log("Spawning " + newName);
                
                if (Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'upgrader'}}) == OK) {
                    console.log("Spawning " + newName);
                }
            }

            else if (builds.length < 1) {
                var newName = 'Builder' + Game.time;
                
                if (Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'builder'}}) == OK) {
                    console.log("Spawning " + newName);
                }
            }
        }
    }
}

module.exports = spawning;