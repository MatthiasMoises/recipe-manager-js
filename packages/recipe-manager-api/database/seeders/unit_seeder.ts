import Unit from '#models/unit'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  static environment = ['development', 'testing']

  async run() {
    await Unit.createMany([
      { name: 'Becher' },
      { name: 'Beet/e' },
      { name: 'Beutel' },
      { name: 'Blatt' },
      { name: 'Blätter' },
      { name: 'Bund' },
      { name: 'Bündel' },
      { name: 'cl' },
      { name: 'cm' },
      { name: 'dicke' },
      { name: 'dl' },
      { name: 'Dose' },
      { name: 'Dose/n' },
      { name: 'dünne' },
      { name: 'Ecke(n)' },
      { name: 'Eimer' },
      { name: 'einige' },
      { name: 'einige Stiele' },
      { name: 'EL' },
      { name: 'EL, gehäuft' },
      { name: 'EL, gestr.' },
      { name: 'etwas' },
      { name: 'evtl.' },
      { name: 'extra' },
      { name: 'Fässchen' },
      { name: 'Fläschchen' },
      { name: 'Flaschen' },
      { name: 'Flaschen' },
      { name: 'g' },
      { name: 'Glas' },
      { name: 'Gläser' },
      { name: 'gr. Dose/n' },
      { name: 'gr. Flasche(n)' },
      { name: 'gr. Glas' },
      { name: 'gr. Gläser' },
      { name: 'gr. Kopf' },
      { name: 'gr. Scheibe(n)' },
      { name: 'gr. Stück(e)' },
      { name: 'große' },
      { name: 'großen' },
      { name: 'großer' },
      { name: 'großes' },
      { name: 'halbes' },
      { name: 'Halm(e)' },
      { name: 'Handvoll' },
      { name: 'Kästchen' },
      { name: 'kg' },
      { name: 'kl. Bund' },
      { name: 'kl. Dose/n' },
      { name: 'kl. Flasche/n' },
      { name: 'kl. Glas' },
      { name: 'kl. Gläser' },
      { name: 'kl. Kopf' },
      { name: 'kl. Scheibe(n)' },
      { name: 'kl. Stange(n)' },
      { name: 'kl. Stück(e)' },
      { name: 'kleine' },
      { name: 'kleiner' },
      { name: 'kleines' },
      { name: 'Knolle/n' },
      { name: 'Kopf' },
      { name: 'Köpfe' },
      { name: 'Körner' },
      { name: 'Kugel' },
      { name: 'Kugel/n' },
      { name: 'Kugeln' },
      { name: 'Liter' },
      { name: 'm.-große' },
      { name: 'm.-großer' },
      { name: 'm.-großes' },
      { name: 'mehr' },
      { name: 'mg' },
      { name: 'ml' },
      { name: 'Msp.' },
      { name: 'n. B.' },
      { name: 'Paar' },
      { name: 'Paket' },
      { name: 'Pck.' },
      { name: 'Pkt.' },
      { name: 'Platte/n' },
      { name: 'Port.' },
      { name: 'Prise(n)' },
      { name: 'Prisen' },
      { name: 'Prozent %' },
      { name: 'Riegel' },
      { name: 'Ring/e' },
      { name: 'Rippe/n' },
      { name: 'Rispe(n)' },
      { name: 'Rolle(n)' },
      { name: 'Schälchen' },
      { name: 'Scheibe/n' },
      { name: 'Schuss' },
      { name: 'Spritzer' },
      { name: 'Stange/n' },
      { name: 'Stängel' },
      { name: 'Staude(n)' },
      { name: 'Stick(s)' },
      { name: 'Stiel/e' },
      { name: 'Stiele' },
      { name: 'Streifen' },
      { name: 'Stück(e)' },
      { name: 'Tablette(n)' },
      { name: 'Tafel' },
      { name: 'Tafeln' },
      { name: 'Tasse' },
      { name: 'Tasse/n' },
      { name: 'Teil/e' },
      { name: 'TL' },
      { name: 'TL, gehäuft' },
      { name: 'TL, gestr.' },
      { name: 'Topf' },
      { name: 'Tropfen' },
      { name: 'Tube/n' },
      { name: 'Tüte/n' },
      { name: 'viel' },
      { name: 'wenig' },
      { name: 'Würfel' },
      { name: 'Wurzel' },
      { name: 'Wurzel/n' },
      { name: 'Zehe/n' },
      { name: 'Zweig/e' },
    ])
  }
}
