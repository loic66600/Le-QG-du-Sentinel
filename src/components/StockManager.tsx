import React, { useState, useEffect } from 'react';
import { Language } from '../types/sentinel';
import {
  Package,
  Plus,
  Minus,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  FolderPlus,
  Search,
  Printer,
  Download,
  Droplet,
  Utensils,
  HeartPulse,
  Zap,
  Box
} from 'lucide-react';

interface StockManagerProps {
  language: Language;
}

export interface StockItem {
  id: string;
  name: string;
  category: 'water' | 'food' | 'medical' | 'energy' | 'gear';
  quantity: number;
  unit: string;
  expirationDate: string; // YYYY-MM-DD or '' for non-perishable
  notes?: string;
}

export interface StockList {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  items: StockItem[];
}

const STORAGE_KEY_STOCKS = 'sentinel_survival_stocks_v1';

const DEFAULT_STOCK_LISTS: StockList[] = [
  {
    id: 'list-home-reserve',
    name: 'Réserve Principale (Domicile / Cave)',
    description: 'Stock familial d’autonomie alimentaire et eau potable à domicile.',
    createdAt: '2026-11-01',
    items: [
      {
        id: 'item-1',
        name: 'Packs d’eau de source (6 x 1,5 L)',
        category: 'water',
        quantity: 8,
        unit: 'packs (72 L)',
        expirationDate: '2027-08-15',
        notes: 'Stocké à l’abri de la lumière'
      },
      {
        id: 'item-2',
        name: 'Conserves de Thon & Sardines à l’huile',
        category: 'food',
        quantity: 24,
        unit: 'boîtes',
        expirationDate: '2029-05-20',
        notes: 'Riche en protéines et lipides'
      },
      {
        id: 'item-3',
        name: 'Riz blanc long grain (Sachets 1 kg)',
        category: 'food',
        quantity: 10,
        unit: 'kg',
        expirationDate: '2028-11-10',
        notes: 'En seau hermétique'
      },
      {
        id: 'item-4',
        name: 'Lait UHT demi-écrémé',
        category: 'food',
        quantity: 6,
        unit: 'briques (1 L)',
        expirationDate: '2026-12-05',
        notes: 'À surveiller et consommer en rotation'
      },
      {
        id: 'item-5',
        name: 'Pastilles de purification d’eau (Micropur Forte)',
        category: 'water',
        quantity: 2,
        unit: 'boîtes (200 L)',
        expirationDate: '2028-04-01'
      },
      {
        id: 'item-6',
        name: 'Cartouches de gaz butane/propane (Réchaud)',
        category: 'energy',
        quantity: 8,
        unit: 'cartouches',
        expirationDate: ''
      }
    ]
  },
  {
    id: 'list-pharmacy',
    name: 'Pharmacie & Trousse de Secours',
    description: 'Médicaments d’urgence, pansements, garrot et réhydratation.',
    createdAt: '2026-11-01',
    items: [
      {
        id: 'med-1',
        name: 'Garrot Tourniquet CAT Gen-7 + Pansement compressif',
        category: 'medical',
        quantity: 2,
        unit: 'unités',
        expirationDate: ''
      },
      {
        id: 'med-2',
        name: 'Sachets de Réhydratation Orale (SRO)',
        category: 'medical',
        quantity: 20,
        unit: 'sachets',
        expirationDate: '2027-06-30'
      },
      {
        id: 'med-3',
        name: 'Paracétamol 1000 mg & Antiseptique Chlorhexidine',
        category: 'medical',
        quantity: 4,
        unit: 'boîtes',
        expirationDate: '2027-02-15'
      },
      {
        id: 'med-4',
        name: 'Compresses stériles & Bandes extensibles',
        category: 'medical',
        quantity: 15,
        unit: 'pochettes',
        expirationDate: '2028-09-01'
      }
    ]
  },
  {
    id: 'list-bugout-72h',
    name: 'Sacs d’Évacuation 72h & Véhicule',
    description: 'Vivres compacts, eau et énergie prêts à partir en moins de 5 minutes.',
    createdAt: '2026-11-01',
    items: [
      {
        id: 'bob-1',
        name: 'Rations compactes NRG-5 (2300 kcal / paquet)',
        category: 'food',
        quantity: 6,
        unit: 'paquets (500g)',
        expirationDate: '2035-01-01'
      },
      {
        id: 'bob-2',
        name: 'Gourdes filtrantes & Poche à eau 3L',
        category: 'water',
        quantity: 2,
        unit: 'unités',
        expirationDate: ''
      },
      {
        id: 'bob-3',
        name: 'Piles AA & AAA Lithium longue conservation',
        category: 'energy',
        quantity: 24,
        unit: 'piles',
        expirationDate: '2034-06-01'
      }
    ]
  }
];

export const StockManager: React.FC<StockManagerProps> = ({ language }) => {
  const isFr = language === 'fr';

  const [lists, setLists] = useState<StockList[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STOCKS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return DEFAULT_STOCK_LISTS;
  });

  const [activeListId, setActiveListId] = useState<string>(() => lists[0]?.id || 'list-home-reserve');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // New List Modal / Form state
  const [isCreatingList, setIsCreatingList] = useState<boolean>(false);
  const [newListName, setNewListName] = useState<string>('');
  const [newListDesc, setNewListDesc] = useState<string>('');

  // New Item Form state
  const [newItemName, setNewItemName] = useState<string>('');
  const [newItemCategory, setNewItemCategory] = useState<StockItem['category']>('food');
  const [newItemQty, setNewItemQty] = useState<number>(1);
  const [newItemUnit, setNewItemUnit] = useState<string>('unités');
  const [newItemExp, setNewItemExp] = useState<string>('');
  const [newItemNotes, setNewItemNotes] = useState<string>('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STOCKS, JSON.stringify(lists));
    } catch {}
  }, [lists]);

  const activeList = lists.find(l => l.id === activeListId) || lists[0];

  // Check expiration status relative to current date
  const getExpirationStatus = (expDate: string): 'non-perishable' | 'valid' | 'expiring-soon' | 'expired' => {
    if (!expDate) return 'non-perishable';
    const now = new Date();
    const exp = new Date(expDate);
    if (isNaN(exp.getTime())) return 'non-perishable';
    const diffDays = Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'expired';
    if (diffDays <= 60) return 'expiring-soon';
    return 'valid';
  };

  const formatDaysRemaining = (expDate: string): string => {
    if (!expDate) return isFr ? 'Non périssable' : 'Non-perishable';
    const now = new Date();
    const exp = new Date(expDate);
    if (isNaN(exp.getTime())) return expDate;
    const diffDays = Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) {
      return isFr ? `Périmé (${Math.abs(diffDays)} j)` : `Expired (${Math.abs(diffDays)}d ago)`;
    }
    if (diffDays === 0) return isFr ? 'Expire aujourd’hui !' : 'Expires today!';
    if (diffDays <= 60) return isFr ? `Expire dans ${diffDays} j` : `In ${diffDays} days`;
    return exp.toLocaleDateString('fr-FR');
  };

  // Create a new list
  const handleCreateList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListName.trim()) return;
    const created: StockList = {
      id: `list-${Date.now()}`,
      name: newListName.trim(),
      description: newListDesc.trim() || (isFr ? 'Liste d’inventaire personnalisée' : 'Custom stock list'),
      createdAt: new Date().toISOString().slice(0, 10),
      items: []
    };
    setLists(prev => [...prev, created]);
    setActiveListId(created.id);
    setNewListName('');
    setNewListDesc('');
    setIsCreatingList(false);
  };

  // Delete a list
  const handleDeleteList = (id: string) => {
    if (lists.length <= 1) return;
    const remaining = lists.filter(l => l.id !== id);
    setLists(remaining);
    if (activeListId === id) {
      setActiveListId(remaining[0].id);
    }
  };

  // Add item to active list
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || !activeList) return;

    const item: StockItem = {
      id: `item-${Date.now()}`,
      name: newItemName.trim(),
      category: newItemCategory,
      quantity: Math.max(1, Number(newItemQty) || 1),
      unit: newItemUnit.trim() || 'unités',
      expirationDate: newItemExp,
      notes: newItemNotes.trim() || undefined
    };

    setLists(prev =>
      prev.map(l => (l.id === activeList.id ? { ...l, items: [item, ...l.items] } : l))
    );
    setNewItemName('');
    setNewItemQty(1);
    setNewItemNotes('');
  };

  // Update item quantity (+ / -)
  const handleAdjustQuantity = (itemId: string, delta: number) => {
    if (!activeList) return;
    setLists(prev =>
      prev.map(l =>
        l.id === activeList.id
          ? {
              ...l,
              items: l.items.map(it =>
                it.id === itemId ? { ...it, quantity: Math.max(0, it.quantity + delta) } : it
              )
            }
          : l
      )
    );
  };

  // Delete item
  const handleDeleteItem = (itemId: string) => {
    if (!activeList) return;
    setLists(prev =>
      prev.map(l =>
        l.id === activeList.id ? { ...l, items: l.items.filter(it => it.id !== itemId) } : l
      )
    );
  };

  // Export all stock lists as CSV/Markdown
  const handleExportStocks = () => {
    const lines: string[] = [
      `# INVENTAIRE DES STOCKS DE SURVIE — SENTINEL (${new Date().toLocaleDateString('fr-FR')})\n`
    ];
    lists.forEach(list => {
      lines.push(`## ${list.name} (${list.items.length} références)`);
      lines.push(`| Produit | Catégorie | Quantité | Expiration | Notes |`);
      lines.push(`|---|---|---|---|---|`);
      list.items.forEach(it => {
        lines.push(
          `| ${it.name} | ${it.category} | ${it.quantity} ${it.unit} | ${
            it.expirationDate || 'Non périssable'
          } | ${it.notes || '-'} |`
        );
      });
      lines.push('');
    });

    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sentinel-stocks-survie-${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Statistics for the active list
  const totalProductsCount = activeList ? activeList.items.length : 0;
  const totalUnitsCount = activeList
    ? activeList.items.reduce((sum, it) => sum + (Number(it.quantity) || 0), 0)
    : 0;
  const expiringOrExpiredCount = activeList
    ? activeList.items.filter(it => {
        const st = getExpirationStatus(it.expirationDate);
        return st === 'expired' || st === 'expiring-soon';
      }).length
    : 0;

  // Filtered and sorted items (FEFO: earliest expiration first)
  const filteredItems = (activeList ? activeList.items : [])
    .filter(it => {
      if (categoryFilter === 'alerts') {
        const st = getExpirationStatus(it.expirationDate);
        return st === 'expired' || st === 'expiring-soon';
      }
      const matchesCat = categoryFilter === 'all' || it.category === categoryFilter;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCat;
      return (
        matchesCat &&
        (it.name.toLowerCase().includes(q) ||
          (it.notes && it.notes.toLowerCase().includes(q)))
      );
    })
    .sort((a, b) => {
      if (!a.expirationDate && !b.expirationDate) return 0;
      if (!a.expirationDate) return 1;
      if (!b.expirationDate) return -1;
      return a.expirationDate.localeCompare(b.expirationDate);
    });

  const renderCategoryBadge = (cat: StockItem['category']) => {
    switch (cat) {
      case 'water':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-950/90 border border-sky-700 text-sky-200">
            <Droplet className="w-3 h-3" /> {isFr ? 'Eau' : 'Water'}
          </span>
        );
      case 'food':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/90 border border-amber-700 text-amber-200">
            <Utensils className="w-3 h-3" /> {isFr ? 'Vivres' : 'Food'}
          </span>
        );
      case 'medical':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-950/90 border border-rose-700 text-rose-200">
            <HeartPulse className="w-3 h-3" /> {isFr ? 'Médical' : 'Medical'}
          </span>
        );
      case 'energy':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/90 border border-emerald-700 text-emerald-200">
            <Zap className="w-3 h-3" /> {isFr ? 'Énergie' : 'Energy'}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-800 border border-stone-600 text-stone-200">
            <Box className="w-3 h-3" /> {isFr ? 'Matériel' : 'Gear'}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 min-w-0">
      {/* 1. HEADER BANNER */}
      <div className="border border-neutral-800 rounded-lg bg-[#232718] px-5 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-lg bg-black/60 border border-amber-500/60 flex items-center justify-center text-amber-400 shrink-0">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-wider uppercase font-mono">
              {isFr ? 'STOCK DE SURVIE & GESTION DES RÉSERVES' : 'SURVIVAL STOCK & INVENTORY MANAGER'}
            </h1>
            <p className="text-xs text-stone-300 mt-0.5">
              {isFr
                ? 'Créez plusieurs listes de stocks, suivez le nombre de produits, les quantités et les dates d’expiration.'
                : 'Create multiple stock lists, track product counts, quantities, and expiration dates.'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => setIsCreatingList(!isCreatingList)}
            className="px-3.5 py-2 rounded-md bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <FolderPlus className="w-4 h-4" />
            <span>{isFr ? '+ Nouvelle Liste de Stock' : '+ New Stock List'}</span>
          </button>

          <button
            onClick={handleExportStocks}
            className="px-3.5 py-2 rounded-md bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-stone-200 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>{isFr ? 'Exporter tout' : 'Export All'}</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-3 py-2 rounded-md bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-stone-200 text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isFr ? 'Imprimer' : 'Print'}</span>
          </button>
        </div>
      </div>

      {/* NEW LIST CREATION FORM */}
      {isCreatingList && (
        <form
          onSubmit={handleCreateList}
          className="bg-neutral-950 border border-amber-500/60 rounded-xl p-5 space-y-3"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-amber-300 uppercase font-mono">
              {isFr ? 'Créer une Nouvelle Liste de Stock' : 'Create a New Stock List'}
            </h3>
            <button
              type="button"
              onClick={() => setIsCreatingList(false)}
              className="text-xs text-stone-400 hover:text-white cursor-pointer"
            >
              {isFr ? 'Annuler' : 'Cancel'}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              required
              value={newListName}
              onChange={e => setNewListName(e.target.value)}
              placeholder={
                isFr
                  ? 'Nom de la liste (ex : Garage, Abri Jardin, Sac Enfant)...'
                  : 'List name (e.g. Garage, Basement, Kid Bag)...'
              }
              className="px-3.5 py-2 bg-black border border-neutral-700 focus:border-amber-500 rounded-md text-xs text-white outline-none"
            />
            <input
              type="text"
              value={newListDesc}
              onChange={e => setNewListDesc(e.target.value)}
              placeholder={isFr ? 'Description courte (optionnel)...' : 'Short description (optional)...'}
              className="px-3.5 py-2 bg-black border border-neutral-700 focus:border-amber-500 rounded-md text-xs text-white outline-none"
            />
            <button
              type="submit"
              className="py-2 px-4 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-md cursor-pointer"
            >
              {isFr ? 'Créer la Liste' : 'Create List'}
            </button>
          </div>
        </form>
      )}

      {/* 2. LIST SELECTOR TABS (MULTIPLE LISTS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {lists.map(list => {
          const isSelected = list.id === activeList?.id;
          const alertCount = list.items.filter(it => {
            const st = getExpirationStatus(it.expirationDate);
            return st === 'expired' || st === 'expiring-soon';
          }).length;

          return (
            <div
              key={list.id}
              onClick={() => setActiveListId(list.id)}
              className={`cursor-pointer rounded-xl p-4 border transition-all flex flex-col justify-between gap-2 ${
                isSelected
                  ? 'bg-[#232718] border-amber-500 shadow-lg'
                  : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-white truncate">{list.name}</h3>
                  <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">
                    {list.description}
                  </p>
                </div>
                {lists.length > 1 && (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleDeleteList(list.id);
                    }}
                    className="p-1 text-stone-500 hover:text-rose-400 cursor-pointer shrink-0"
                    title={isFr ? 'Supprimer cette liste' : 'Delete list'}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80 text-[11px] font-mono">
                <span className="text-amber-300 font-bold">
                  {list.items.length} {isFr ? 'produits' : 'items'}
                </span>
                {alertCount > 0 ? (
                  <span className="text-rose-400 font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    {alertCount} {isFr ? 'à vérifier' : 'alerts'}
                  </span>
                ) : (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> OK
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. ACTIVE LIST SUMMARY METRICS & ADD PRODUCT FORM */}
      {activeList && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT (4 cols): ADD PRODUCT TO CURRENT LIST + SUMMARY COUNTERS */}
          <div className="lg:col-span-4 space-y-4">
            {/* Summary Counters */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 text-center">
                <div className="text-[10px] font-mono uppercase text-stone-400">
                  {isFr ? 'Produits' : 'Products'}
                </div>
                <div className="text-xl font-extrabold text-white font-mono mt-0.5">
                  {totalProductsCount}
                </div>
              </div>
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 text-center">
                <div className="text-[10px] font-mono uppercase text-stone-400">
                  {isFr ? 'Quantité Totale' : 'Total Qty'}
                </div>
                <div className="text-xl font-extrabold text-amber-400 font-mono mt-0.5">
                  {totalUnitsCount}
                </div>
              </div>
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 text-center">
                <div className="text-[10px] font-mono uppercase text-stone-400">
                  {isFr ? 'Expirations' : 'Expiring'}
                </div>
                <div
                  className={`text-xl font-extrabold font-mono mt-0.5 ${
                    expiringOrExpiredCount > 0 ? 'text-rose-400' : 'text-emerald-400'
                  }`}
                >
                  {expiringOrExpiredCount}
                </div>
              </div>
            </div>

            {/* Add Product Form */}
            <form
              onSubmit={handleAddItem}
              className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-3.5"
            >
              <div className="flex items-center gap-2 border-b border-neutral-800 pb-2.5">
                <Plus className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase font-mono">
                  {isFr ? 'Ajouter un Produit dans la Liste' : 'Add Product to List'}
                </h3>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-300 block">
                  {isFr ? 'Nom du produit *' : 'Product Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={newItemName}
                  onChange={e => setNewItemName(e.target.value)}
                  placeholder={
                    isFr
                      ? 'Ex : Bouteilles d’eau 1.5L, Conserves lentilles...'
                      : 'E.g. Water bottles, Canned beans...'
                  }
                  className="w-full px-3 py-2 bg-black border border-neutral-700 focus:border-amber-500 rounded-md text-xs text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-300 block">
                    {isFr ? 'Catégorie' : 'Category'}
                  </label>
                  <select
                    value={newItemCategory}
                    onChange={e => setNewItemCategory(e.target.value as StockItem['category'])}
                    className="w-full px-3 py-2 bg-black border border-neutral-700 focus:border-amber-500 rounded-md text-xs text-white outline-none"
                  >
                    <option value="water">{isFr ? '💧 Eau & Boissons' : '💧 Water'}</option>
                    <option value="food">{isFr ? '🥫 Conserves & Vivres' : '🥫 Food'}</option>
                    <option value="medical">{isFr ? '🏥 Médicaments & Soins' : '🏥 Medical'}</option>
                    <option value="energy">{isFr ? '⚡ Énergie, Gaz & Piles' : '⚡ Energy'}</option>
                    <option value="gear">{isFr ? '📦 Matériel & Hygiène' : '📦 Gear'}</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-300 block">
                    {isFr ? 'Date d’expiration' : 'Expiration Date'}
                  </label>
                  <input
                    type="date"
                    value={newItemExp}
                    onChange={e => setNewItemExp(e.target.value)}
                    className="w-full px-3 py-2 bg-black border border-neutral-700 focus:border-amber-500 rounded-md text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-300 block">
                    {isFr ? 'Quantité *' : 'Quantity *'}
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={newItemQty}
                    onChange={e => setNewItemQty(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-black border border-neutral-700 focus:border-amber-500 rounded-md text-xs text-white outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-300 block">
                    {isFr ? 'Unité' : 'Unit'}
                  </label>
                  <input
                    type="text"
                    value={newItemUnit}
                    onChange={e => setNewItemUnit(e.target.value)}
                    placeholder="boîtes, L, kg, packs..."
                    className="w-full px-3 py-2 bg-black border border-neutral-700 focus:border-amber-500 rounded-md text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-300 block">
                  {isFr ? 'Emplacement / Remarque (optionnel)' : 'Location / Note'}
                </label>
                <input
                  type="text"
                  value={newItemNotes}
                  onChange={e => setNewItemNotes(e.target.value)}
                  placeholder={isFr ? 'Ex : Étagère du bas, Caisse n°2...' : 'E.g. Bottom shelf, Bin #2...'}
                  className="w-full px-3 py-2 bg-black border border-neutral-700 focus:border-amber-500 rounded-md text-xs text-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-md bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{isFr ? 'Ajouter au Stock' : 'Add to Stock'}</span>
              </button>
            </form>
          </div>

          {/* RIGHT (8 cols): PRODUCTS TABLE WITH QUANTITY CONTROLS & EXPIRATION BADGES */}
          <div className="lg:col-span-8 bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
              <div>
                <h2 className="text-base font-bold text-white">{activeList.name}</h2>
                <p className="text-xs text-stone-400">
                  {isFr
                    ? 'Trié automatiquement par date d’expiration la plus proche (méthode FEFO).'
                    : 'Automatically sorted by earliest expiration date (FEFO rotation).'}
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={isFr ? 'Rechercher un produit...' : 'Search item...'}
                  className="w-full pl-8 pr-3 py-1.5 bg-black border border-neutral-700 rounded-md text-xs text-white outline-none"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'all', label: isFr ? 'Tous' : 'All' },
                { id: 'alerts', label: isFr ? '⚠️ À renouveler / Périmés' : '⚠️ Expiring / Expired' },
                { id: 'water', label: isFr ? '💧 Eau' : '💧 Water' },
                { id: 'food', label: isFr ? '🥫 Vivres' : '🥫 Food' },
                { id: 'medical', label: isFr ? '🏥 Médical' : '🏥 Medical' },
                { id: 'energy', label: isFr ? '⚡ Énergie' : '⚡ Energy' },
                { id: 'gear', label: isFr ? '📦 Matériel' : '📦 Gear' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setCategoryFilter(tab.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer ${
                    categoryFilter === tab.id
                      ? 'bg-[#3b4228] text-amber-200 border border-amber-500/80 font-bold'
                      : 'bg-black text-stone-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Items List */}
            {filteredItems.length === 0 ? (
              <div className="p-8 text-center border border-neutral-800 rounded-lg bg-black/50 text-stone-400 text-xs">
                {isFr
                  ? 'Aucun produit dans cette sélection. Utilisez le formulaire à gauche pour ajouter vos réserves.'
                  : 'No products in this selection. Use the form on the left to add items.'}
              </div>
            ) : (
              <div className="space-y-2.5">
                {filteredItems.map(item => {
                  const status = getExpirationStatus(item.expirationDate);
                  return (
                    <div
                      key={item.id}
                      className={`p-3.5 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        status === 'expired'
                          ? 'bg-rose-950/20 border-rose-700/70'
                          : status === 'expiring-soon'
                          ? 'bg-amber-950/20 border-amber-600/70'
                          : 'bg-black border-neutral-800'
                      }`}
                    >
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          {renderCategoryBadge(item.category)}
                          <h4 className="text-sm font-bold text-white truncate">{item.name}</h4>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone-400">
                          <span className="flex items-center gap-1 font-mono">
                            <Calendar className="w-3 h-3 text-stone-500" />
                            <span
                              className={
                                status === 'expired'
                                  ? 'text-rose-400 font-bold'
                                  : status === 'expiring-soon'
                                  ? 'text-amber-400 font-bold'
                                  : 'text-emerald-400'
                              }
                            >
                              {formatDaysRemaining(item.expirationDate)}
                            </span>
                          </span>
                          {item.notes && <span>· {item.notes}</span>}
                        </div>
                      </div>

                      {/* Quantity Controls + Delete */}
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center bg-neutral-900 border border-neutral-700 rounded-md overflow-hidden">
                          <button
                            onClick={() => handleAdjustQuantity(item.id, -1)}
                            className="p-2 hover:bg-neutral-800 text-stone-300 cursor-pointer"
                            title="-1"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <div className="px-3 py-1 text-center font-mono text-xs font-bold text-amber-300 min-w-[75px]">
                            {item.quantity} <span className="text-[10px] text-stone-400 font-normal">{item.unit}</span>
                          </div>
                          <button
                            onClick={() => handleAdjustQuantity(item.id, 1)}
                            className="p-2 hover:bg-neutral-800 text-stone-300 cursor-pointer"
                            title="+1"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-2 rounded-md bg-neutral-900 hover:bg-rose-950 border border-neutral-800 hover:border-rose-700 text-stone-400 hover:text-rose-300 cursor-pointer"
                          title={isFr ? 'Supprimer ce produit' : 'Remove item'}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
