import customtkinter as ctk
import sys
import os

# Mock Database
class MockDB:
    def get_all_products(self): return []
    def get_all_sales(self): return []
    def get_all_clients(self): return []
    def get_sales_by_category(self): return []
    def get_all_bills(self): return []
    def get_inventory_by_category(self): return []
    def get_sales_data(self): return []
    def get_top_selling_products(self): return []
    def get_total_stats(self): return {"revenue": 0, "orders": 0, "bills": 0, "low_stock": 0}
    def get_setting(self, k, d=None): return d
    def get_all_cards(self): return []

# Mock App
class MockApp:
    def show_toast(self, m, c=None): print(f"Toast: {m}")
    def show_revenue_details(self): pass
    def show_orders_details(self): pass
    def show_low_stock_details(self): pass
    def play_click_sound(self): pass

sys.path.append(os.getcwd())
from nexgen_hub.ui.inventory import InventoryView
from nexgen_hub.ui.sales import SalesView
from nexgen_hub.ui.clients import ClientsView
from nexgen_hub.ui.low_stock import LowStockView
from nexgen_hub.ui.revenue_details import RevenueDetailsView
from nexgen_hub.ui.orders_details import OrdersDetailsView
from nexgen_hub.ui.dashboard import DashboardView
from nexgen_hub.ui.cards import CardsView

root = ctk.CTk()
db = MockDB()
app = MockApp()

views = [
    ("Inventory", InventoryView),
    ("Sales", SalesView),
    ("Clients", ClientsView),
    ("LowStock", LowStockView),
    ("Revenue", RevenueDetailsView),
    ("Orders", OrdersDetailsView),
    ("Dashboard", DashboardView),
    ("Cards", CardsView)
]

for name, ViewClass in views:
    try:
        print(f"Testing {name}...")
        v = ViewClass(root, db)
        print(f"  {name} initialized successfully.")
    except Exception as e:
        print(f"  ERROR in {name}: {e}")
        import traceback
        traceback.print_exc()

print("Test complete.")
