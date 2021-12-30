var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {

    var harvs = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var ups = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builds = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

    if (harvs.length < 4) {
        var newName = 'Harvester' + Game.time;
        console.log("Spawning " + newName);
        
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, WORK, MOVE], newName, {memory: {role: 'harvester'}});
    }

    if (ups.length < 2) {
        var newName = 'Upgrader' + Game.time;
        console.log("Spawning " + newName);
        
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'upgrader'}});
    }

    if (builds.length < 2) {
        var newName = 'Builder' + Game.time;
        console.log("Spawning " + newName);
        
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, WORK, MOVE], newName, {memory: {role: 'builder'}});
    }

    var tower = Game.getObjectById('8d69ef12148c13528de45cf1');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        for(var i in Memory.creeps) {
            if(!Game.creeps[i]) {
                delete Memory.creeps[i];
            }
        }
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}